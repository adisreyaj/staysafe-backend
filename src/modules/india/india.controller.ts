/*
 * File: india.controller.ts
 * Project: staysafe-server
 * File Created: Wednesday, 8th April 2020 9:24:37 pm
 * Author: Adithya Sreyaj
 * -----
 * Last Modified: Wednesday, 8th April 2020 11:29:38 pm
 * Modified By: Adithya Sreyaj<adi.sreyaj@gmail.com>
 * -----
 */

import {
  Controller,
  Get,
  UseInterceptors,
  CacheInterceptor,
} from '@nestjs/common';
import { IndiaService } from './india.service';

@Controller('india')
@UseInterceptors(CacheInterceptor)
export class IndiaController {
  constructor(private indiaService: IndiaService) {}

  @Get('/total')
  async getIndiaTotalStats() {
    return await this.indiaService.getIndiaTotalStats();
  }

  @Get('/states')
  async getStateData() {
    return await this.indiaService.getIndiaStateData();
  }
}
