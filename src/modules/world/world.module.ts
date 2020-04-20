/*
 * File: world.module.ts
 * Project: staysafe-server
 * File Created: Sunday, 5th April 2020 4:18:28 pm
 * Author: Adithya Sreyaj
 * -----
 * Last Modified: Tuesday, 21st April 2020 12:08:28 am
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
import { PushNotificationModule } from '../communication/push-notification/push-notification.module';

@Module({
  imports: [
    HttpModule.registerAsync({
      useClass: HttpConfigService,
    }),
    CacheModule.registerAsync({
      useClass: CacheConfigService,
    }),
    MongooseModule.forFeature([{ name: 'Country', schema: CountrySchema }]),
    PushNotificationModule,
  ],
  providers: [WorldService, WorldCronService],
  controllers: [WorldController],
})
export class WorldModule {}
