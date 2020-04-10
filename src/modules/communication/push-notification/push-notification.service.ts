/*
 * File: push-notification.service.ts
 * Project: staysafe-server
 * File Created: Friday, 10th April 2020 7:33:13 pm
 * Author: Adithya Sreyaj
 * -----
 * Last Modified: Friday, 10th April 2020 7:44:37 pm
 * Modified By: Adithya Sreyaj<adi.sreyaj@gmail.com>
 * -----
 */

import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { PushTokenDTO } from './push-token.dto';
import { PushTokenMongoose } from './push-notification.interface';
@Injectable()
export class PushNotificationService {
  constructor(
    @InjectModel('Push_Notifications')
    private pushModel: Model<PushTokenMongoose>,
  ) {}
  async saveToken(tokenDTO: PushTokenDTO) {
    const tokenToSave = new this.pushModel(tokenDTO);
    try {
      return await tokenToSave.save();
    } catch (error) {
      Logger.error(`[Push Notification Save] Failed with ${error}`);
      return undefined;
    }
  }
}
