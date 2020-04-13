/*
 * File: sms.controller.ts
 * Project: staysafe-server
 * File Created: Monday, 13th April 2020 9:40:49 pm
 * Author: Adithya Sreyaj
 * -----
 * Last Modified: Monday, 13th April 2020 11:41:49 pm
 * Modified By: Adithya Sreyaj<adi.sreyaj@gmail.com>
 * -----
 */

import { Controller, Get, Post, Body } from '@nestjs/common';
import { SmsService } from './sms.service';
import { SmsDTO } from './sms.dto';
import { SMSJobData } from './sms.interface';
import { SMSHelper } from './sms.helper';

@Controller('sms')
export class SmsController {
  constructor(private smsService: SmsService) {}
  @Get()
  async sendSMS() {
    return await this.smsService.sendSMS({
      to: '+917012327791',
      body: 'Test Message via Queue',
    });
  }

  @Post('register')
  async registerPhoneNumber(@Body() smsDTO: SmsDTO) {
    const { phone } = smsDTO;
    const smsData: SMSJobData = SMSHelper.constructNewRegistrationContent(
      phone,
    );
    return await this.smsService.savePhoneNumber(smsDTO);
  }
}
