/*
 * File: india.service.ts
 * Project: staysafe-server
 * File Created: Wednesday, 8th April 2020 9:24:45 pm
 * Author: Adithya Sreyaj
 * -----
 * Last Modified: Wednesday, 8th April 2020 9:59:51 pm
 * Modified By: Adithya Sreyaj<adi.sreyaj@gmail.com>
 * -----
 */

import { Injectable, HttpService } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { map, filter } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { StateData } from './india.interface';

@Injectable()
export class IndiaService {
  indiaDataEndpoint: string;
  constructor(private config: ConfigService, private http: HttpService) {
    this.indiaDataEndpoint = this.config.get('INDIA_STATS_URL');
  }

  getIndiaData() {
    const response = this.http.get(`${this.indiaDataEndpoint}/data.json`, {
      headers: { 'content-type': 'application/json' },
    });
    return response.pipe(map(response => response.data));
  }

  getIndiaTotalStats() {
    const response = this.getIndiaData();
    return response.pipe(
      map(data => data.statewise),
      map(states => states.filter(state => state.statecode === 'TT')),
    );
  }

  getIndiaStateData(): Observable<StateData[]> {
    const response = this.getIndiaData();
    return response.pipe(
      map(data => data.statewise),
      map(states => states.filter(state => state.statecode !== 'TT')),
    );
  }
}
