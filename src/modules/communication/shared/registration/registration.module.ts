/*
 * File: registration.module.ts
 * Project: staysafe-server
 * File Created: Tuesday, 14th April 2020 12:57:24 am
 * Author: Adithya Sreyaj
 * -----
 * Last Modified: Tuesday, 14th April 2020 1:19:11 am
 * Modified By: Adithya Sreyaj<adi.sreyaj@gmail.com>
 * -----
 */

import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { SmsService } from '../../sms/sms.service';
import { VoiceCallService } from '../../voice-call/voice-call.service';
import { MongooseModule } from '@nestjs/mongoose';
import { SMSSchema } from '../../sms/sms.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'sms', schema: SMSSchema }]),
    BullModule.registerQueueAsync({
      name: 'sms',
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        redis: {
          host: configService.get('REDIS_HOST'),
          port: +configService.get('REDIS_PORT'),
          db: 2,
        },
      }),
      inject: [ConfigService],
    }),
    BullModule.registerQueueAsync({
      name: 'voice_call',
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        redis: {
          host: configService.get('REDIS_HOST'),
          port: +configService.get('REDIS_PORT'),
          db: 3,
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [SmsService, VoiceCallService],
  exports: [SmsService, VoiceCallService, BullModule, MongooseModule],
})
export class RegistrationModule {}
