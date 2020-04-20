/*
 * File: india-cron.service.ts
 * Project: staysafe-server
 * File Created: Sunday, 19th April 2020 1:33:20 am
 * Author: Adithya Sreyaj
 * -----
 * Last Modified: Monday, 20th April 2020 11:54:36 pm
 * Modified By: Adithya Sreyaj<adi.sreyaj@gmail.com>
 * -----
 */

import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { IndiaService } from '../india.service';
import { PushNotificationService } from 'src/modules/communication/push-notification/push-notification.service';
import { IndiaHelper } from '../india.helper';

@Injectable()
export class IndiaCronService {
  constructor(
    private indiaService: IndiaService,
    private pushNotificationService: PushNotificationService,
  ) {}
  @Cron('* * 2 * * *')
  handleCron() {
    this.indiaService.refreshIndiaData();
  }

  @Cron('* * 8 * * *', {
    timeZone: 'Asia/Kolkata',
  })
  async sendIndiaStats() {
    this.indiaService.getIndiaTotalStats().subscribe(data => {
      const message = IndiaHelper.constructDailyStatsPushMessage(data);
      this.pushNotificationService.sendPushNotification(message);
    });
  }
}
