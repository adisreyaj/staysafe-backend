/*
 * File: push-notification.interface.ts
 * Project: staysafe-server
 * File Created: Friday, 10th April 2020 7:37:15 pm
 * Author: Adithya Sreyaj
 * -----
 * Last Modified: Friday, 10th April 2020 7:37:52 pm
 * Modified By: Adithya Sreyaj<adi.sreyaj@gmail.com>
 * -----
 */

import { Document } from 'mongoose';

export interface PushToken {
  token: string;
}

export interface PushTokenMongoose extends PushToken, Document {}
