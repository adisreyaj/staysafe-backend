/*
 * File: world.module.ts
 * Project: staysafe-server
 * File Created: Sunday, 5th April 2020 4:18:28 pm
 * Author: Adithya Sreyaj
 * -----
 * Last Modified: Sunday, 19th April 2020 1:31:52 am
 * Modified By: Adithya Sreyaj<adi.sreyaj@gmail.com>
 * -----
 */

import { Module, HttpModule, CacheModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { HttpConfigService } from 'src/core/config/http-config/http-config.service';
import { WorldService } from './world.service';
import { WorldController } from './world.controller';
import { CacheConfigService } from 'src/core/config/cache-config/cache-config.service';
import { CountrySchema } from './world.schema';
import { WorldCronService } from './world-cron/world-cron.service';

@Module({
  imports: [
    HttpModule.registerAsync({
      useClass: HttpConfigService,
    }),
    CacheModule.registerAsync({
      useClass: CacheConfigService,
    }),
    MongooseModule.forFeature([{ name: 'Country', schema: CountrySchema }]),
  ],
  providers: [WorldService, WorldCronService],
  controllers: [WorldController],
})
export class WorldModule {}
