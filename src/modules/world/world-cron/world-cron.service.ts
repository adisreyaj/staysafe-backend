/*
 * File: world-cron.service.ts
 * Project: staysafe-server
 * File Created: Sunday, 19th April 2020 1:36:04 am
 * Author: Adithya Sreyaj
 * -----
 * Last Modified: Sunday, 19th April 2020 1:38:15 am
 * Modified By: Adithya Sreyaj<adi.sreyaj@gmail.com>
 * -----
 */

import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

import { WorldService } from '../world.service';

@Injectable()
export class WorldCronService {
  constructor(private worldService: WorldService) {}

  @Cron('* * 2 * * *')
  handleCron() {
    this.worldService.refreshWorldData();
  }
}
