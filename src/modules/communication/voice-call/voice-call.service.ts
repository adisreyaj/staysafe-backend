/*
 * File: voice-call.service.ts
 * Project: staysafe-server
 * File Created: Monday, 13th April 2020 11:32:26 pm
 * Author: Adithya Sreyaj
 * -----
 * Last Modified: Tuesday, 14th April 2020 1:17:37 am
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

  async inboundCallWebhook(body: InboundCallDTO) {
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

  async createVerificationCall(phoneNumber: string) {
    return await this.voiceCallQueue.add({
      to: phoneNumber,
      type: VoiceCallType.verification,
    });
  }

  private async markUserVerified(phone: string) {
    return this.smsService.markUserAsVerified(phone);
  }
}
