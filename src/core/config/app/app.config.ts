/*
 * File: app.config.ts
 * Project: staysafe-server
 * File Created: Sunday, 5th April 2020 6:41:38 pm
 * Author: Adithya Sreyaj
 * -----
 * Last Modified: Sunday, 5th April 2020 6:51:01 pm
 * Modified By: Adithya Sreyaj<adi.sreyaj@gmail.com>
 * -----
 */

import { INestApplication } from '@nestjs/common';

import * as helmet from 'helmet';
import * as compression from 'compression';
import * as rateLimit from 'express-rate-limit';

export class AppConfiguration {
  static setup(app: INestApplication) {
    app.use(helmet());
    app.enableCors();
    app.use(compression());
    app.use(
      rateLimit({
        windowMs: 1 * 60 * 1000, // 1 minute
        max: 100,
      }),
    );
  }
}
