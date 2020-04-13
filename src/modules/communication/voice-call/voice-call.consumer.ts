/*
 * File: sms.consumer.ts
 * Project: staysafe-server
 * File Created: Monday, 13th April 2020 10:25:27 pm
 * Author: Adithya Sreyaj
 * -----
 * Last Modified: Tuesday, 14th April 2020 12:12:53 am
 * Modified By: Adithya Sreyaj<adi.sreyaj@gmail.com>
 * -----
 */

import { Processor, Process, OnQueueActive } from '@nestjs/bull';
import { ConfigService } from '@nestjs/config';
import { Twilio } from 'twilio';
import { Job } from 'bull';
import { VoiceCallJobData } from './voice-call.interface';

@Processor('voice_call')
export class VoiceCallConsumer {
  twilio: Twilio;
  twilioNumber: string;
  constructor(private configService: ConfigService) {
    const accountSId = this.configService.get('TWILIO_ACCOUNT_SID');
    const authToken = this.configService.get('TWILIO_AUTH_TOKEN');
    this.twilioNumber = this.configService.get('TWILIO_PHONE_NUMBER');
    this.twilio = new Twilio(accountSId, authToken);
  }
  @Process()
  async sendVoiceCall(job: Job<VoiceCallJobData>) {
    const { to } = job.data;
    const response = await this.twilio.calls.create({
      to,
      from: this.twilioNumber,
      applicationSid: 'AP541f6b3a6c3cb1250357cdea687dd962',
    });
    return response;
  }

  @OnQueueActive()
  onActive(job: Job<VoiceCallJobData>) {
    const { to } = job.data;
    console.log(`Calling to ${to}...`);
  }
}
