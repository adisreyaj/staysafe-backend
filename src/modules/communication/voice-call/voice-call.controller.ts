/*
 * File: voice-call.controller.ts
 * Project: staysafe-server
 * File Created: Monday, 13th April 2020 11:32:51 pm
 * Author: Adithya Sreyaj
 * -----
 * Last Modified: Tuesday, 14th April 2020 12:55:54 am
 * Modified By: Adithya Sreyaj<adi.sreyaj@gmail.com>
 * -----
 */

import { Controller, Post, Header, Body } from '@nestjs/common';

import { VoiceCallService } from './voice-call.service';
import { InboundCallDTO } from './voice-call.dto';

@Controller('voice-call')
export class VoiceCallController {
  constructor(private callService: VoiceCallService) {}

  @Post('verify')
  @Header('Content-Type', 'text/xml')
  async inComingCall(@Body() body: InboundCallDTO) {
    return await this.callService.inboundCallWebhook(body);
  }
}
