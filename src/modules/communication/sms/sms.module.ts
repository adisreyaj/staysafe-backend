/*
 * File: sms.module.ts
 * Project: staysafe-server
 * File Created: Monday, 13th April 2020 8:12:01 pm
 * Author: Adithya Sreyaj
 * -----
 * Last Modified: Tuesday, 14th April 2020 1:18:54 am
 * Modified By: Adithya Sreyaj<adi.sreyaj@gmail.com>
 * -----
 */

import { Module } from '@nestjs/common';

import { SmsController } from './sms.controller';
import { SMSConsumer } from './sms.consumer';
import { RegistrationModule } from '../shared/registration/registration.module';
import { MongooseModule } from '@nestjs/mongoose';
import { SMSSchema } from './sms.schema';

@Module({
  imports: [RegistrationModule],
  providers: [SMSConsumer],
  controllers: [SmsController],
})
export class SmsModule {}
