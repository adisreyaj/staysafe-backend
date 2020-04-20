/*
 * File: voice-call.controller.ts
 * Project: staysafe-server
 * File Created: Monday, 13th April 2020 11:32:51 pm
 * Author: Adithya Sreyaj
 * -----
 * Last Modified: Tuesday, 14th April 2020 1:37:45 am
 * Modified By: Adithya Sreyaj<adi.sreyaj@gmail.com>
 * -----
 */

import { Controller, Post, Header, Body } from '@nestjs/common';

import { VoiceCallService } from './voice-call.service';
import { InboundCallDTO } from './voice-call.dto';

@Controller('voice-call')
export class VoiceCallController {
  constructor(private callService: VoiceCallService) {}

  /**
   * This endpoint will be the webhook for Twilio when we request a verification call to
   * a phone number.
   *
   * This route should be added in the TwiML application's **Voice Request URL**
   * @link https://www.twilio.com/console/voice/twiml/apps
   * @param body - Twilio Wenhook Post Data
   */
  @Post('verify')
  @Header('Content-Type', 'text/xml')
  async inComingCall(@Body() body: InboundCallDTO) {
    return await this.callService.verificationCallWebhook(body);
  }
}
