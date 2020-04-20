/*
 * File: world-cron.service.ts
 * Project: staysafe-server
 * File Created: Sunday, 19th April 2020 1:36:04 am
 * Author: Adithya Sreyaj
 * -----
 * Last Modified: Tuesday, 21st April 2020 12:07:57 am
 * Modified By: Adithya Sreyaj<adi.sreyaj@gmail.com>
 * -----
 */

import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

import { WorldService } from '../world.service';
import { PushNotificationService } from 'src/modules/communication/push-notification/push-notification.service';
import { WorldHelper } from '../world.helper';

@Injectable()
export class WorldCronService {
  constructor(
    private worldService: WorldService,
    private pushNotificationService: PushNotificationService,
  ) {}

  @Cron('* * 2 * * *')
  handleCron() {
    this.worldService.refreshWorldData();
  }

  @Cron('* * 8 * * *', {
    timeZone: 'Asia/Kolkata',
  })
  async sendIndiaStats() {
    this.worldService.getWorldStats().subscribe(data => {
      const message = WorldHelper.constructDailyStatsPushMessage(data);
      this.pushNotificationService.sendPushNotification(message);
    });
  }
}
