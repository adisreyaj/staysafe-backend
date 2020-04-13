/*
 * File: email.consumer.ts
 * Project: staysafe-server
 * File Created: Monday, 13th April 2020 10:24:09 pm
 * Author: Adithya Sreyaj
 * -----
 * Last Modified: Monday, 13th April 2020 10:24:31 pm
 * Modified By: Adithya Sreyaj<adi.sreyaj@gmail.com>
 * -----
 */

import { Processor } from '@nestjs/bull';

@Processor('email')
export class EmailConsumer {}
