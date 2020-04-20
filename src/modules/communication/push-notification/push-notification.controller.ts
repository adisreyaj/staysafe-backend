/*
 * File: push-notification.controller.ts
 * Project: staysafe-server
 * File Created: Monday, 13th April 2020 9:45:22 pm
 * Author: Adithya Sreyaj
 * -----
 * Last Modified: Monday, 20th April 2020 11:51:11 pm
 * Modified By: Adithya Sreyaj<adi.sreyaj@gmail.com>
 * -----
 */

import {
  Controller,
  Get,
  Post,
  Body,
  InternalServerErrorException,
} from '@nestjs/common';

import { PushTokenDTO } from './push-token.dto';
import { PushNotificationService } from './push-notification.service';

@Controller('push-notification')
export class PushNotificationController {
  constructor(private pushNotificationService: PushNotificationService) {}

  @Post('push/token')
  async savePushNotificationToken(@Body() token: PushTokenDTO) {
    const tokenSaved = await this.pushNotificationService.saveToken(token);
    if (!tokenSaved) {
      return new InternalServerErrorException();
    }
    return {
      message: 'Token saved successfully',
    };
  }
}
