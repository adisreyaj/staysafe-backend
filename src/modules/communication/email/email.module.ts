/*
 * File: email.module.ts
 * Project: staysafe-server
 * File Created: Monday, 13th April 2020 8:08:53 pm
 * Author: Adithya Sreyaj
 * -----
 * Last Modified: Thursday, 16th April 2020 9:14:43 pm
 * Modified By: Adithya Sreyaj<adi.sreyaj@gmail.com>
 * -----
 */

import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { BullModule } from '@nestjs/bull';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EmailConsumer } from './email.consumer';

@Module({
  providers: [EmailService, EmailConsumer],
  imports: [
    BullModule.registerQueueAsync({
      name: 'email',
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        redis: {
          host: configService.get('REDIS_HOST'),
          port: +configService.get('REDIS_PORT'),
          password: configService.get('REDIS_PASSWORD'),
          db: 0,
        },
      }),
      inject: [ConfigService],
    }),
  ],
})
export class EmailModule {}
