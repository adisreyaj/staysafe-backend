/*
 * File: world.controller.ts
 * Project: staysafe-server
 * File Created: Sunday, 5th April 2020 5:17:56 pm
 * Author: Adithya Sreyaj
 * -----
 * Last Modified: Thursday, 9th April 2020 10:30:18 pm
 * Modified By: Adithya Sreyaj<adi.sreyaj@gmail.com>
 * -----
 */

import {
  Controller,
  Get,
  InternalServerErrorException,
  Query,
  Logger,
  UseInterceptors,
  CacheInterceptor,
} from '@nestjs/common';
import { WorldService } from './world.service';

@Controller('world')
@UseInterceptors(CacheInterceptor)
export class WorldController {
  constructor(private worldService: WorldService) {}
  @Get('stats')
  async getWorldStats() {
    return await this.worldService.getWorldStats();
  }
  @Get('')
  async getWorldData(@Query() query) {
    return await this.worldService.getWorldData(query);
  }
}
