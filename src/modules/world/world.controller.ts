/*
 * File: world.controller.ts
 * Project: staysafe-server
 * File Created: Sunday, 5th April 2020 5:17:56 pm
 * Author: Adithya Sreyaj
 * -----
 * Last Modified: Wednesday, 8th April 2020 8:59:06 pm
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
  @Get('')
  async getWorldData(@Query() query) {
    return await this.worldService.getWorldData(query);
  }
}
