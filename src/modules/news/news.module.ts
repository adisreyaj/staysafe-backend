/*
 * File: news.module.ts
 * Project: staysafe-server
 * File Created: Friday, 10th April 2020 3:12:18 pm
 * Author: Adithya Sreyaj
 * -----
 * Last Modified: Friday, 10th April 2020 3:20:41 pm
 * Modified By: Adithya Sreyaj<adi.sreyaj@gmail.com>
 * -----
 */


import { Module, HttpModule, CacheModule } from '@nestjs/common';
import { NewsController } from './news.controller';
import { NewsService } from './news.service';
import { HttpConfigService } from 'src/core/config/http-config/http-config.service';
import { CacheConfigService } from 'src/core/config/cache-config/cache-config.service';

@Module({
  imports: [
    HttpModule.registerAsync({
      useClass: HttpConfigService,
    }),
    CacheModule.registerAsync({
      useClass: CacheConfigService,
    }),
  ],
  controllers: [NewsController],
  providers: [NewsService],
})
export class NewsModule {}
