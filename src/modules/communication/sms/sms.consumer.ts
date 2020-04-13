/*
 * File: sms.consumer.ts
 * Project: staysafe-server
 * File Created: Monday, 13th April 2020 10:25:27 pm
 * Author: Adithya Sreyaj
 * -----
 * Last Modified: Tuesday, 14th April 2020 12:11:22 am
 * Modified By: Adithya Sreyaj<adi.sreyaj@gmail.com>
 * -----
 */

import { Processor, Process, OnQueueActive } from '@nestjs/bull';
import { ConfigService } from '@nestjs/config';
import { Twilio } from 'twilio';
import { Job } from 'bull';

import { SMSJobData } from './sms.interface';

@Processor('sms')
export class SMSConsumer {
  twilio: Twilio;
  twilioNumber: string;
  constructor(private configService: ConfigService) {
    const accountSId = this.configService.get('TWILIO_ACCOUNT_SID');
    const authToken = this.configService.get('TWILIO_AUTH_TOKEN');
    this.twilioNumber = this.configService.get('TWILIO_PHONE_NUMBER');
    this.twilio = new Twilio(accountSId, authToken);
  }
  @Process()
  async sendSMS(job: Job<SMSJobData>) {
    const { to, from, body } = job.data;
    const response = await this.twilio.messages.create({
      to,
      body,
      from,
    });
    return response;
  }

  @OnQueueActive()
  onActive(job: Job<SMSJobData>) {
    const { to } = job.data;
    console.log(`Sending SMS to ${to}...`);
  }
}
