/*
 * File: app.module.ts
 * Project: staysafe-server
 * File Created: Sunday, 5th April 2020 1:45:13 pm
 * Author: Adithya Sreyaj
 * -----
 * Last Modified: Sunday, 19th April 2020 1:32:13 am
 * Modified By: Adithya Sreyaj<adi.sreyaj@gmail.com>
 * -----
 */

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';

import { AppService } from './app.service';
import { CommunicationModule } from './modules/communication/communication.module';
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
        useUnifiedTopology: true,
        useNewUrlParser: true,
      }),
      inject: [ConfigService],
    }),
    ScheduleModule.forRoot(),
    CommunicationModule,
    WorldModule,
    IndiaModule,
    NewsModule,
  ],
  controllers: [],
  providers: [AppService, HttpConfigService, CacheConfigService],
})
export class AppModule {}
