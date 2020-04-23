/*
 * File: india.module.ts
 * Project: staysafe-server
 * File Created: Wednesday, 8th April 2020 9:23:54 pm
 * Author: Adithya Sreyaj
 * -----
 * Last Modified: Friday, 24th April 2020 12:41:32 am
 * Modified By: Adithya Sreyaj<adi.sreyaj@gmail.com>
 * -----
 */

import { Module, HttpModule, CacheModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { IndiaController } from './india.controller';
import { IndiaService } from './india.service';
import { HttpConfigService } from '../../core/config/http-config/http-config.service';
import { CacheConfigService } from '../../core/config/cache-config/cache-config.service';
import { IndiaSchema } from './india.schema';
import { IndiaCronService } from './india-cron/india-cron.service';
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
    MongooseModule.forFeature([{ name: 'India', schema: IndiaSchema }]),
    PushNotificationModule,
    RegistrationModule,
  ],
  controllers: [IndiaController],
  providers: [IndiaService, IndiaCronService],
})
export class IndiaModule {}
