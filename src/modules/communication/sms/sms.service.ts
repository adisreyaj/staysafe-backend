/*
 * File: sms.service.ts
 * Project: staysafe-server
 * File Created: Monday, 13th April 2020 8:14:23 pm
 * Author: Adithya Sreyaj
 * -----
 * Last Modified: Tuesday, 14th April 2020 1:17:12 am
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
      return 'Number subscribed successfully';
    } catch (error) {
      Logger.error(`[Push Notification Save] Failed with ${error}`);
      return undefined;
    }
  }

  async markUserAsVerified(phone: string) {
    const phoneNumberRecord = await this.smsModel
      .findOneAndUpdate({ phone }, { verified: true }, { new: true })
      .lean()
      .exec();

    if (phoneNumberRecord) return 'Phone verified';
    return undefined;
  }

  private callForVerification(phone: string) {
    return this.callService.createVerificationCall(phone);
  }
}
