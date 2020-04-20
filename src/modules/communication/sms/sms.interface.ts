/*
 * File: sms.interface.ts
 * Project: staysafe-server
 * File Created: Monday, 13th April 2020 10:27:01 pm
 * Author: Adithya Sreyaj
 * -----
 * Last Modified: Tuesday, 14th April 2020 12:41:43 am
 * Modified By: Adithya Sreyaj<adi.sreyaj@gmail.com>
 * -----
 */

import { Document } from 'mongoose';

export interface SMSJobData {
  body?: string;
  from?: string;
  to: string;
}

export interface SMS {
  phone: string;
}

export interface SMSMongoose extends SMS, Document {}
