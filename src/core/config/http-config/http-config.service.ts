/*
 * File: http-config.service.ts
 * Project: staysafe-server
 * File Created: Sunday, 5th April 2020 5:11:47 pm
 * Author: Adithya Sreyaj
 * -----
 * Last Modified: Sunday, 5th April 2020 5:13:50 pm
 * Modified By: Adithya Sreyaj<adi.sreyaj@gmail.com>
 * -----
 */

import {
  Injectable,
  HttpModuleOptions,
  HttpModuleOptionsFactory,
} from '@nestjs/common';

@Injectable()
export class HttpConfigService implements HttpModuleOptionsFactory {
  createHttpOptions(): HttpModuleOptions {
    return {
      timeout: 5000,
      maxRedirects: 5,
    };
  }
}
