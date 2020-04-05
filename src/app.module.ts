/*
 * File: app.module.ts
 * Project: staysafe-server
 * File Created: Sunday, 5th April 2020 1:45:13 pm
 * Author: Adithya Sreyaj
 * -----
 * Last Modified: Sunday, 5th April 2020 5:11:33 pm
 * Modified By: Adithya Sreyaj<adi.sreyaj@gmail.com>
 * -----
 */

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppService } from './app.service';
import { CommunicationModule } from './modules/communication/communication.module';
import { SmsModule } from './core/services/sms/sms.module';
import { WorldModule } from './modules/world/world.module';
import { HttpConfigService } from './core/config/http-config/http-config.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    CommunicationModule,
    SmsModule,
    WorldModule,
  ],
  controllers: [],
  providers: [AppService, HttpConfigService],
})
export class AppModule {}
