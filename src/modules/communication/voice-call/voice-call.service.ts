/*
 * File: voice-call.service.ts
 * Project: staysafe-server
 * File Created: Monday, 13th April 2020 11:32:26 pm
 * Author: Adithya Sreyaj
 * -----
 * Last Modified: Tuesday, 14th April 2020 1:33:15 am
 * Modified By: Adithya Sreyaj<adi.sreyaj@gmail.com>
 * -----
 */

import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { twiml } from 'twilio';
import { Queue } from 'bull';

import { VoiceCallType } from './voice-call.interface';
import { VoiceCallHelper } from './voice-call.helper';
import { SmsService } from '../sms/sms.service';
import { InboundCallDTO } from './voice-call.dto';

@Injectable()
export class VoiceCallService {
  constructor(
    @InjectQueue('voice_call') private voiceCallQueue: Queue,
    @Inject(forwardRef(() => SmsService))
    private smsService: SmsService,
  ) {}
  /**
   * The verification call webhook will be called by Twilio when the
   * user registers their phone number for updates.
   *
   * The function generates TwiML which features the **Gather** functionality
   * of twilio. When the call is made, the user will be asked to press **1** to
   * confirm their subscription.
   *
   * If the user confirms, a call is made to the ```markuserVerified()``` function
   * which will update the phone number as verified in the DB
   * @param body - the data that will be posted by TWILIO
   */
  async verificationCallWebhook(body: InboundCallDTO) {
    const twiML = new twiml.VoiceResponse();
    function gather() {
      const gatherNode = twiML.gather({ numDigits: 1 });
      gatherNode.say(VoiceCallHelper.constructVerificationCallGatherMessage());
    }
    if (!body.Digits) {
      twiML.say(
        { voice: 'alice' },
        VoiceCallHelper.constructVerificationCallWelcomeMessage(),
      );
      // If no input was sent, use the <Gather> verb to collect user input
      gather();
    }
    switch (+body.Digits) {
      case 1:
        const res = await this.markUserVerified(body.To);
        if (res) {
          twiML.say(VoiceCallHelper.constructVerificationSuccessMessage());
        } else {
          twiML.say(VoiceCallHelper.constructVerificationFailureMessage());
        }
        break;
      default:
        twiML.say(VoiceCallHelper.constructVerificationCallWorngInputMessage());
        twiML.pause();
        gather();
        break;
    }
    // If the user doesn't enter input, loop
    return twiML.toString();
  }
  /**
   * Adds an outbound verification call in the voice call Queue.
   * @param  phoneNumber - the phone number which needs to be called for verification
   */
  async createVerificationCall(phoneNumber: string) {
    return await this.voiceCallQueue.add({
      to: phoneNumber,
      type: VoiceCallType.verification,
    });
  }

  /**
   * Relays the request to mark a phone number as verified to the
   * SMS service.
   * @param phone - phone number to be marked as verified
   */
  private async markUserVerified(phone: string) {
    return this.smsService.markUserAsVerified(phone);
  }
}
