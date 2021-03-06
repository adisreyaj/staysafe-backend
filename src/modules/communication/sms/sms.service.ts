/*
 * File: sms.service.ts
 * Project: staysafe-server
 * File Created: Monday, 13th April 2020 8:14:23 pm
 * Author: Adithya Sreyaj
 * -----
 * Last Modified: Friday, 24th April 2020 12:36:42 am
 * Modified By: Adithya Sreyaj<adi.sreyaj@gmail.com>
 * -----
 */

import {
  Injectable,
  Logger,
  InternalServerErrorException,
  BadRequestException,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectQueue } from '@nestjs/bull';
import { InjectModel } from '@nestjs/mongoose';
import { Queue } from 'bull';
import { Model } from 'mongoose';

import { SMSJobData, SMSMongoose } from './sms.interface';
import { SmsDTO } from './sms.dto';
import { VoiceCallService } from '../voice-call/voice-call.service';

@Injectable()
export class SmsService {
  twilioNumber: string;
  constructor(
    @InjectQueue('sms') private smsQueue: Queue,
    @InjectModel('sms') private smsModel: Model<SMSMongoose>,
    private configService: ConfigService,
    @Inject(forwardRef(() => VoiceCallService))
    private callService: VoiceCallService,
  ) {
    this.twilioNumber = this.configService.get('TWILIO_PHONE_NUMBER');
  }

  /**
   * Send SMS to a particular number with the speicied body.
   *
   * The function validates the data and then add the a job to the
   * SMS Queue which will be then processed by the ```SMSConsumer```
   *
   * @param to - to which phone number the SMS needs to be send
   * @param body = the contents of the SMS
   */
  async sendSMS({ to, body }: SMSJobData) {
    if (!to)
      return new BadRequestException(
        new Error('Phone number should be specified'),
      );
    if (!body)
      return new BadRequestException(
        new Error('SMS content should be specified'),
      );
    const smsData: SMSJobData = {
      to,
      body,
      from: this.twilioNumber,
    };
    try {
      this.smsQueue.add(smsData);
      Logger.debug(`[Send SMS] Job added to Queue`);
      return 'SMS Queued';
    } catch (error) {
      Logger.error(`[Send SMS] Failed to add job to queue ${error}`);
      return new InternalServerErrorException(error);
    }
  }

  async sendBulkSMS({ to, body }: { to: string[]; body: string }) {
    if (to && Array.isArray(to) && to.length > 0) {
      return Promise.all(
        to.map(number => {
          return this.sendSMS({ to: number, body });
        }),
      );
    } else {
      return undefined;
    }
  }

  /**
   * Save a phone number to the Database.
   * First it checks whether the phone number has already been registered in the system or not.
   * if already present a bad request will be thrown.
   *
   * After validation the phone number will be saved to the DB
   *
   * @param smsDTO -  the request bodu containing the phone number to be saved
   */
  async savePhoneNumber(smsDTO: SmsDTO) {
    const { phone } = smsDTO;
    const checkIfNumberExists = await this.smsModel
      .findOne({ phone })
      .lean()
      .exec();
    if (checkIfNumberExists)
      return new BadRequestException(new Error('Number already subscribed'));
    const phoneNumberToSave = new this.smsModel(smsDTO);
    try {
      await phoneNumberToSave.save();
      this.callForVerification(phone);
      return { message: 'Number subscribed successfully' };
    } catch (error) {
      Logger.error(`[Push Notification Save] Failed with ${error}`);
      return undefined;
    }
  }

  /**
   * The function can be called to make a phone number as verified.
   * Initially when the phone number is added to the datanase, the **verified** flag
   * will be false.
   *
   * @param phone - phone number to be marked as verified
   */
  async markUserAsVerified(phone: string) {
    const phoneNumberRecord = await this.smsModel
      .findOneAndUpdate({ phone }, { verified: true }, { new: true })
      .lean()
      .exec();

    if (phoneNumberRecord) return 'Phone verified';
    return undefined;
  }

  async getVerifiedPhoneNumbers() {
    const numbers = await this.smsModel
      .find({ verified: true })
      .lean()
      .exec();
    if (numbers && numbers.length > 0) return numbers.map(item => item.phone);
    return undefined;
  }
  private callForVerification(phone: string) {
    return this.callService.createVerificationCall(phone);
  }
}
