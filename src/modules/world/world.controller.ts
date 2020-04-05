/*
 * File: world.controller.ts
 * Project: staysafe-server
 * File Created: Sunday, 5th April 2020 5:17:56 pm
 * Author: Adithya Sreyaj
 * -----
 * Last Modified: Sunday, 5th April 2020 5:58:56 pm
 * Modified By: Adithya Sreyaj<adi.sreyaj@gmail.com>
 * -----
 */

import {
  Controller,
  Get,
  InternalServerErrorException,
  Query,
  Logger,
} from '@nestjs/common';
import { WorldService } from './world.service';
import { tap } from 'rxjs/operators';

@Controller('world')
export class WorldController {
  constructor(private worldService: WorldService) {}
  @Get()
  async getWorldData(@Query() query) {
    return await this.worldService.getWorldData(query);
  }
}
