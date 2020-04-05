/*
 * File: cache-config.service.ts
 * Project: staysafe-server
 * File Created: Sunday, 5th April 2020 8:27:15 pm
 * Author: Adithya Sreyaj
 * -----
 * Last Modified: Sunday, 5th April 2020 10:08:55 pm
 * Modified By: Adithya Sreyaj<adi.sreyaj@gmail.com>
 * -----
 */

import {
  Injectable,
  CacheOptionsFactory,
  CacheModuleOptions,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CacheConfigService implements CacheOptionsFactory {
  constructor(private config: ConfigService) {}
  createCacheOptions(): CacheModuleOptions {
    return {
      ttl: +this.config.get('CACHE_EXPIRY_SECONDS') || 600,
    };
  }
}
