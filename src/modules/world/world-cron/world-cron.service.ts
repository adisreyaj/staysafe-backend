/*
 * File: world-cron.service.ts
 * Project: staysafe-server
 * File Created: Sunday, 19th April 2020 1:36:04 am
 * Author: Adithya Sreyaj
 * -----
 * Last Modified: Monday, 27th April 2020 11:52:16 pm
 * Modified By: Adithya Sreyaj<adi.sreyaj@gmail.com>
 * -----
 */

import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

import { WorldService } from '../world.service';
import { PushNotificationService } from 'src/modules/communication/push-notification/push-notification.service';
import { WorldHelper } from '../world.helper';
import { SmsService } from 'src/modules/communication/sms/sms.service';

@Injectable()
export class WorldCronService {
  constructor(
    private worldService: WorldService,
    private pushNotificationService: PushNotificationService,
    private smsService: SmsService,
  ) {}

  @Cron('* * 2 * * *')
  handleCron() {
    this.worldService.refreshWorldData();
  }

  @Cron('0 0 8 * * ?', {
    timeZone: 'Asia/Kolkata',
  })
  async sendIndiaStats() {
    this.worldService.getWorldStats().subscribe(async data => {
      const pushMessage = WorldHelper.constructDailyStatsPushMessage(data);
      const smsMessage = WorldHelper.constructDailyStatsSMSMessage(data);
      const numbersToSendSMS = await this.smsService.getVerifiedPhoneNumbers();
      this.pushNotificationService.sendPushNotificationToTopic(pushMessage);
      this.smsService.sendBulkSMS({ to: numbersToSendSMS, body: smsMessage });
    });
  }
}
