/*
 * File: communication.module.ts
 * Project: staysafe-server
 * File Created: Sunday, 5th April 2020 2:53:32 pm
 * Author: Adithya Sreyaj
 * -----
 * Last Modified: Tuesday, 14th April 2020 1:14:07 am
 * Modified By: Adithya Sreyaj<adi.sreyaj@gmail.com>
 * -----
 */

import { Module, forwardRef } from '@nestjs/common';

import { EmailModule } from './email/email.module';
import { SmsModule } from './sms/sms.module';
import { PushNotificationModule } from './push-notification/push-notification.module';
import { VoiceCallModule } from './voice-call/voice-call.module';
import { RegistrationModule } from './shared/registration/registration.module';

@Module({
  imports: [
    EmailModule,
    PushNotificationModule,
    SmsModule,
    VoiceCallModule,
    RegistrationModule,
  ],
})
export class CommunicationModule {}
