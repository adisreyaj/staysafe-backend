/*
 * File: email.service.ts
 * Project: staysafe-server
 * File Created: Monday, 13th April 2020 8:14:35 pm
 * Author: Adithya Sreyaj
 * -----
 * Last Modified: Monday, 13th April 2020 10:23:42 pm
 * Modified By: Adithya Sreyaj<adi.sreyaj@gmail.com>
 * -----
 */

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectQueue } from '@nestjs/bull';

import { Queue } from 'bull';
import * as sgMail from '@sendgrid/mail';
@Injectable()
export class EmailService {
  constructor(
    private configService: ConfigService,
    @InjectQueue('email') private emailQueue: Queue,
  ) {
    const sendgridAPIKey = this.configService.get('SENDGRID_API_KEY');
    sgMail.setApiKey(sendgridAPIKey);
  }

  sendEmail() {}
}
