/*
 * File: world.module.ts
 * Project: staysafe-server
 * File Created: Sunday, 5th April 2020 4:18:28 pm
 * Author: Adithya Sreyaj
 * -----
 * Last Modified: Sunday, 5th April 2020 5:13:46 pm
 * Modified By: Adithya Sreyaj<adi.sreyaj@gmail.com>
 * -----
 */

import { Module, HttpModule } from '@nestjs/common';

import { HttpConfigService } from 'src/core/config/http-config/http-config.service';
import { WorldService } from './world.service';
import { WorldController } from './world.controller';

@Module({
  imports: [
    HttpModule.registerAsync({
      useClass: HttpConfigService,
    }),
  ],
  providers: [WorldService],
  controllers: [WorldController],
})
export class WorldModule {}
