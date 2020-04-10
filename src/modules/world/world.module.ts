/*
 * File: world.module.ts
 * Project: staysafe-server
 * File Created: Sunday, 5th April 2020 4:18:28 pm
 * Author: Adithya Sreyaj
 * -----
 * Last Modified: Friday, 10th April 2020 1:57:51 pm
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
  providers: [WorldService],
  controllers: [WorldController],
})
export class WorldModule {}
