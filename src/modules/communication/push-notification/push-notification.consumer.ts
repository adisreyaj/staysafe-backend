/*
 * File: push-notification.consumer.ts
 * Project: staysafe-server
 * File Created: Monday, 13th April 2020 10:25:16 pm
 * Author: Adithya Sreyaj
 * -----
 * Last Modified: Monday, 13th April 2020 10:25:54 pm
 * Modified By: Adithya Sreyaj<adi.sreyaj@gmail.com>
 * -----
 */

import { Processor } from '@nestjs/bull';

@Processor('push_notification')
export class PushNotificationConsumer {}
