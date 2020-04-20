/*
 * File: push-notification.module.ts
 * Project: staysafe-server
 * File Created: Monday, 13th April 2020 9:45:29 pm
 * Author: Adithya Sreyaj
 * -----
 * Last Modified: Monday, 20th April 2020 11:31:21 pm
 * Modified By: Adithya Sreyaj<adi.sreyaj@gmail.com>
 * -----
 */

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { BullModule } from '@nestjs/bull';

import { PushNotificationController } from './push-notification.controller';
import { PushNotificationService } from './push-notification.service';
import { PushNotificationSchema } from './push-token.schema';
import { PushNotificationConsumer } from './push-notification.consumer';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Push_Notifications', schema: PushNotificationSchema },
    ]),
    BullModule.registerQueueAsync({
      name: 'push_notification',
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        redis: {
          host: configService.get('REDIS_HOST'),
          port: +configService.get('REDIS_PORT'),
          password: configService.get('REDIS_PASSWORD'),
          db: 1,
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [PushNotificationController],
  providers: [PushNotificationService, PushNotificationConsumer],
  exports: [PushNotificationService],
})
export class PushNotificationModule {}
