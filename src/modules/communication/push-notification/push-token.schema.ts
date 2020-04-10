/*
 * File: push-token.schema.ts
 * Project: staysafe-server
 * File Created: Friday, 10th April 2020 7:33:43 pm
 * Author: Adithya Sreyaj
 * -----
 * Last Modified: Friday, 10th April 2020 7:34:09 pm
 * Modified By: Adithya Sreyaj<adi.sreyaj@gmail.com>
 * -----
 */

import { Schema } from 'mongoose';

export const PushNotificationSchema = new Schema({
  token: String,
});
