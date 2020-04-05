/*
 * File: communication.module.ts
 * Project: staysafe-server
 * File Created: Sunday, 5th April 2020 2:53:32 pm
 * Author: Adithya Sreyaj
 * -----
 * Last Modified: Sunday, 5th April 2020 3:02:48 pm
 * Modified By: Adithya Sreyaj<adi.sreyaj@gmail.com>
 * -----
 */


import { Module } from '@nestjs/common';
import { CommunicationController } from './communication.controller';
import { CommunicationService } from './communication.service';

@Module({
  controllers: [CommunicationController],
  providers: [CommunicationService],
})
export class CommunicationModule {}
