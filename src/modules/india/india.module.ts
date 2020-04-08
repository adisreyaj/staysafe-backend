/*
 * File: india.module.ts
 * Project: staysafe-server
 * File Created: Wednesday, 8th April 2020 9:23:54 pm
 * Author: Adithya Sreyaj
 * -----
 * Last Modified: Wednesday, 8th April 2020 9:38:11 pm
 * Modified By: Adithya Sreyaj<adi.sreyaj@gmail.com>
 * -----
 */


import { Module, HttpModule, CacheModule } from '@nestjs/common';
import { IndiaController } from './india.controller';
import { IndiaService } from './india.service';
import { HttpConfigService } from '../../core/config/http-config/http-config.service';
import { CacheConfigService } from '../../core/config/cache-config/cache-config.service';

@Module({
  imports: [
    HttpModule.registerAsync({
      useClass: HttpConfigService,
    }),
    CacheModule.registerAsync({
      useClass: CacheConfigService,
    }),
  ],
  controllers: [IndiaController],
  providers: [IndiaService],
})
export class IndiaModule {}
