/*
 * File: main.ts
 * Project: staysafe-server
 * File Created: Sunday, 5th April 2020 1:45:13 pm
 * Author: Adithya Sreyaj
 * -----
 * Last Modified: Saturday, 11th April 2020 12:50:24 am
 * Modified By: Adithya Sreyaj<adi.sreyaj@gmail.com>
 * -----
 */

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { AppConfiguration } from './core/config/app/app.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  AppConfiguration.setup(app);
  app.setGlobalPrefix('api/v1');
  const configService = app.get(ConfigService);
  await app.listen(process.env.PORT);
}
bootstrap();
