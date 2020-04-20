/*
 * File: voice-call.module.ts
 * Project: staysafe-server
 * File Created: Monday, 13th April 2020 11:32:16 pm
 * Author: Adithya Sreyaj
 * -----
 * Last Modified: Tuesday, 14th April 2020 1:04:15 am
 * Modified By: Adithya Sreyaj<adi.sreyaj@gmail.com>
 * -----
 */

import { Module } from '@nestjs/common';

import { VoiceCallService } from './voice-call.service';
import { VoiceCallController } from './voice-call.controller';
import { VoiceCallConsumer } from './voice-call.consumer';
import { RegistrationModule } from '../shared/registration/registration.module';

@Module({
  imports: [RegistrationModule],
  providers: [VoiceCallService, VoiceCallConsumer],
  controllers: [VoiceCallController],
})
export class VoiceCallModule {}
