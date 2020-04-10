/*
 * File: communication.module.ts
 * Project: staysafe-server
 * File Created: Sunday, 5th April 2020 2:53:32 pm
 * Author: Adithya Sreyaj
 * -----
 * Last Modified: Friday, 10th April 2020 7:43:14 pm
 * Modified By: Adithya Sreyaj<adi.sreyaj@gmail.com>
 * -----
 */

import { Module } from '@nestjs/common';
import { CommunicationController } from './communication.controller';
import { CommunicationService } from './communication.service';
import { PushNotificationService } from './push-notification/push-notification.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PushNotificationSchema } from './push-notification/push-token.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Push_Notifications', schema: PushNotificationSchema },
    ]),
  ],
  controllers: [CommunicationController],
  providers: [CommunicationService, PushNotificationService],
})
export class CommunicationModule {}
