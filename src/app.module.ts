/*
 * File: app.module.ts
 * Project: staysafe-server
 * File Created: Sunday, 5th April 2020 1:45:13 pm
 * Author: Adithya Sreyaj
 * -----
 * Last Modified: Friday, 10th April 2020 1:57:48 pm
 * Modified By: Adithya Sreyaj<adi.sreyaj@gmail.com>
 * -----
 */

import { Module, CacheModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AppService } from './app.service';
import { CommunicationModule } from './modules/communication/communication.module';
import { SmsModule } from './core/services/sms/sms.module';
import { WorldModule } from './modules/world/world.module';
import { HttpConfigService } from './core/config/http-config/http-config.service';
import { CacheConfigService } from './core/config/cache-config/cache-config.service';
import { IndiaModule } from './modules/india/india.module';
import { NewsModule } from './modules/news/news.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
    CommunicationModule,
    SmsModule,
    WorldModule,
    IndiaModule,
    NewsModule,
  ],
  controllers: [],
  providers: [AppService, HttpConfigService, CacheConfigService],
})
export class AppModule {}
