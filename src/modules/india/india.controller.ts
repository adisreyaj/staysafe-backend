/*
 * File: india.controller.ts
 * Project: staysafe-server
 * File Created: Wednesday, 8th April 2020 9:24:37 pm
 * Author: Adithya Sreyaj
 * -----
 * Last Modified: Thursday, 16th April 2020 9:22:21 pm
 * Modified By: Adithya Sreyaj<adi.sreyaj@gmail.com>
 * -----
 */

import {
  Controller,
  Get,
  UseInterceptors,
  CacheInterceptor,
  Query,
  Post,
} from '@nestjs/common';
import { IndiaService } from './india.service';

@Controller('india')
@UseInterceptors(CacheInterceptor)
export class IndiaController {
  constructor(private indiaService: IndiaService) {}

  @Get('/stats')
  async getIndiaTotalStats() {
    return await this.indiaService.getIndiaTotalStats();
  }

  @Get('/states')
  async getStateData(@Query() query) {
    return await this.indiaService.getIndiaStateData(query);
  }

  @Post('refresh')
  async refreshCountryData() {
    return await this.indiaService.refreshIndiaData();
  }
}
