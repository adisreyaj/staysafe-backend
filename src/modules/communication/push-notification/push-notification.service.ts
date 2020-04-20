/*
 * File: push-notification.service.ts
 * Project: staysafe-server
 * File Created: Friday, 10th April 2020 7:33:13 pm
 * Author: Adithya Sreyaj
 * -----
 * Last Modified: Monday, 20th April 2020 11:48:54 pm
 * Modified By: Adithya Sreyaj<adi.sreyaj@gmail.com>
 * -----
 */

import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { InjectQueue } from '@nestjs/bull';
import { ConfigService } from '@nestjs/config';
import { Queue } from 'bull';
import { Model } from 'mongoose';
import * as admin from 'firebase-admin';

import { service_account } from '../../../firebase_config.json';
import { PushTokenDTO } from './push-token.dto';
import { PushTokenMongoose } from './push-notification.interface';
@Injectable()
export class PushNotificationService {
  constructor(
    @InjectModel('Push_Notifications')
    private pushModel: Model<PushTokenMongoose>,
    private configService: ConfigService,
    @InjectQueue('push_notification') private pushNotificationQueue: Queue,
  ) {
    admin.initializeApp({
      credential: admin.credential.cert(
        service_account as admin.ServiceAccount,
      ),
      databaseURL: this.configService.get('FIREBASE_DB_URI'),
    });
  }
  async saveToken(tokenDTO: PushTokenDTO) {
    const tokenToSave = new this.pushModel(tokenDTO);
    try {
      await admin.messaging().subscribeToTopic(tokenDTO.token, 'general');
      Logger.debug(`[Saving Push Notification] Subscribed to Topic`);
      this.sendPushNotification({
        title: 'Welcome to StaySafe',
        body:
          'Thankyou for subscribing, we will be sending you timley notifications so that you can be aware of the situations around you',
      });
      return await tokenToSave.save();
    } catch (error) {
      Logger.error(`[Push Notification Save] Failed with ${error}`);
      return undefined;
    }
  }

  async sendPushNotification(data: { title: string; body: string }) {
    try {
      await admin
        .messaging()
        .send(this.createPushNotificationMessageForTopic(data));
      return 'Sent';
    } catch (error) {
      Logger.error(`[Push Notification] Failed with ${error}`);
    }
  }

  private createPushNotificationMessageForTopic({ title, body }) {
    const notificationData: admin.messaging.WebpushConfig = {
      notification: {
        title,
        body,
        image: 'https://staysafe.sreyaj.com/assets/images/stay-safe.png',
        badge:
          'https://staysafe.sreyaj.com/assets/images/favicons/favicon-32x32.png',
        icon:
          'https://staysafe.sreyaj.com/assets/images/favicons/favicon-32x32.png',
        vibrate: [100, 50, 20, 20],
      },
      fcmOptions: {
        link: 'https://staysafe.sreyaj.com',
      },
    };
    const pushNoitifcationMessage: admin.messaging.Message = {
      webpush: notificationData,
      topic: 'general',
    };
    return pushNoitifcationMessage;
  }
}
