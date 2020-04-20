/*
 * File: sms.helper.ts
 * Project: staysafe-server
 * File Created: Monday, 13th April 2020 11:16:45 pm
 * Author: Adithya Sreyaj
 * -----
 * Last Modified: Tuesday, 14th April 2020 12:11:17 am
 * Modified By: Adithya Sreyaj<adi.sreyaj@gmail.com>
 * -----
 */

import { SMSJobData } from './sms.interface';
import { smsResources } from 'src/core/config/resource-files/communication';

export class SMSHelper {
  static constructNewRegistrationContent(phone: string) {
    const smsData: SMSJobData = {
      to: phone,
      body: smsResources.registerMessage,
    };
    return smsData;
  }
}
