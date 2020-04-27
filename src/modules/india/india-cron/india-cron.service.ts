/*
 * File: india-cron.service.ts
 * Project: staysafe-server
 * File Created: Sunday, 19th April 2020 1:33:20 am
 * Author: Adithya Sreyaj
 * -----
 * Last Modified: Tuesday, 28th April 2020 12:03:00 am
 * Modified By: Adithya Sreyaj<adi.sreyaj@gmail.com>
 * -----
 */

import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { IndiaService } from '../india.service';
import { PushNotificationService } from 'src/modules/communication/push-notification/push-notification.service';
import { IndiaHelper } from '../india.helper';
import { SmsService } from 'src/modules/communication/sms/sms.service';

@Injectable()
export class IndiaCronService {
  constructor(
    private indiaService: IndiaService,
    private pushNotificationService: PushNotificationService,
    private smsService: SmsService,
  ) {}
  @Cron('* * 2 * * *')
  handleCron() {
    this.indiaService.refreshIndiaData();
  }

  @Cron('0 0 8 * * *', {
    timeZone: 'Asia/Kolkata',
  })
  async sendIndiaStats() {
    this.indiaService.getIndiaTotalStats().subscribe(async data => {
      const pushMessage = IndiaHelper.constructDailyStatsPushMessage(data);
      const smsMessage = IndiaHelper.constructDailyStatsSMSMessage(data);
      const numbersToSendSMS = await this.smsService.getVerifiedPhoneNumbers();
      this.pushNotificationService.sendPushNotificationToTopic(pushMessage);
      this.smsService.sendBulkSMS({ to: numbersToSendSMS, body: smsMessage });
    });
  }
}
