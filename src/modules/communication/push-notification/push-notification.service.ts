/*
 * File: push-notification.service.ts
 * Project: staysafe-server
 * File Created: Friday, 10th April 2020 7:33:13 pm
 * Author: Adithya Sreyaj
 * -----
 * Last Modified: Sunday, 12th April 2020 2:58:17 am
 * Modified By: Adithya Sreyaj<adi.sreyaj@gmail.com>
 * -----
 */

import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
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
  ) {
    admin.initializeApp({
      credential: admin.credential.cert(
        service_account as admin.ServiceAccount,
      ),
      databaseURL: 'https://staysafe-app.firebaseio.com',
    });
  }
  async saveToken(tokenDTO: PushTokenDTO) {
    const tokenToSave = new this.pushModel(tokenDTO);
    try {
      await admin.messaging().subscribeToTopic(tokenDTO.token, 'general');
      Logger.debug(`[Saving Push Notification] Subscribed to Topic`);
      this.sendPushNotification();
      return await tokenToSave.save();
    } catch (error) {
      Logger.error(`[Push Notification Save] Failed with ${error}`);
      return undefined;
    }
  }

  async sendPushNotification() {
    try {
      await admin
        .messaging()
        .send(this.createPushNotificationMessageForTopic());
      return 'Sent';
    } catch (error) {
      Logger.error(`[Push Notification] Failed with ${error}`);
    }
  }

  private createPushNotificationMessageForTopic() {
    const notificationData: admin.messaging.WebpushConfig = {
      notification: {
        title: 'Welcome to StaySafe - Track, Learn and Educate',
        body:
          'Learn and Create awareness on COVID 19 pandemic that is currently taking down the world by storm',
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
      data: {
        foo: 'bar',
      },
      topic: 'general',
    };

    return pushNoitifcationMessage;
  }
}
