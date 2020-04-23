/*
 * File: world.module.ts
 * Project: staysafe-server
 * File Created: Sunday, 5th April 2020 4:18:28 pm
 * Author: Adithya Sreyaj
 * -----
 * Last Modified: Friday, 24th April 2020 12:41:40 am
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
import { RegistrationModule } from '../communication/shared/registration/registration.module';

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
    RegistrationModule,
  ],
  providers: [WorldService, WorldCronService],
  controllers: [WorldController],
})
export class WorldModule {}
