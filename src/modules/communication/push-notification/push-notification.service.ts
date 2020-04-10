/*
 * File: push-notification.service.ts
 * Project: staysafe-server
 * File Created: Friday, 10th April 2020 7:33:13 pm
 * Author: Adithya Sreyaj
 * -----
 * Last Modified: Saturday, 11th April 2020 1:23:55 am
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

  private async sendPushNotification() {
    try {
      await admin
        .messaging()
        .send(
          this.createPushNotificationMessageForTopic(
            'general',
            'This is a test message',
          ),
        );
      Logger.debug('[Push Notification] Sent successfully');
    } catch (error) {
      Logger.error(`[Push Notification] Failed with ${error}`);
    }
  }

  private createPushNotificationMessageForTopic(
    topic: string,
    message: string,
  ) {
    const pushNoitifcationMessage = {
      notification: {
        title: 'Test',
        body: message,
        imageUrl: 'https://staysafe.sreyaj.com/assets/images/logo.svg',
      },
      data: {
        foo: 'bar',
      },
      topic,
    };

    return pushNoitifcationMessage;
  }
}
