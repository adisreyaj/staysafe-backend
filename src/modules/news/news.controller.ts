/*
 * File: news.controller.ts
 * Project: staysafe-server
 * File Created: Friday, 10th April 2020 3:12:25 pm
 * Author: Adithya Sreyaj
 * -----
 * Last Modified: Friday, 10th April 2020 3:50:28 pm
 * Modified By: Adithya Sreyaj<adi.sreyaj@gmail.com>
 * -----
 */

import {
  Controller,
  UseInterceptors,
  CacheInterceptor,
  Get,
  Query,
} from '@nestjs/common';
import { NewsService } from './news.service';

@Controller('news')
@UseInterceptors(CacheInterceptor)
export class NewsController {
  constructor(private newsService: NewsService) {}
  @Get('india')
  getIndiaNews(@Query() query) {
    return this.newsService.getIndiaLatestNews(query);
  }
}
