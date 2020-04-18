/*
 * File: india-cron.service.ts
 * Project: staysafe-server
 * File Created: Sunday, 19th April 2020 1:33:20 am
 * Author: Adithya Sreyaj
 * -----
 * Last Modified: Sunday, 19th April 2020 1:38:13 am
 * Modified By: Adithya Sreyaj<adi.sreyaj@gmail.com>
 * -----
 */

import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { IndiaService } from '../india.service';

@Injectable()
export class IndiaCronService {
  constructor(private indiaService: IndiaService) {}
  @Cron('* * 2 * * *')
  handleCron() {
    this.indiaService.refreshIndiaData();
  }
}
