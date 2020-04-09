/*
 * File: world.service.ts
 * Project: staysafe-server
 * File Created: Sunday, 5th April 2020 4:18:36 pm
 * Author: Adithya Sreyaj
 * -----
 * Last Modified: Thursday, 9th April 2020 10:29:38 pm
 * Modified By: Adithya Sreyaj<adi.sreyaj@gmail.com>
 * -----
 */

import {
  Injectable,
  HttpService,
  Logger,
  InternalServerErrorException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { WorldHelper } from './world.helper';

export interface GetWorlDataOptions {
  country: string;
  sortBy: 'country' | 'cases' | 'deaths';
  orderBy: string;
  limit: string;
  page: string;
}

@Injectable()
export class WorldService {
  countryDataEndpoint: string;
  rapidAPIHost: string;
  rapidAPIKey: string;
  worldInsightsEndpoint: string;
  constructor(private config: ConfigService, private http: HttpService) {
    this.countryDataEndpoint = this.config.get('WORLD_STATS_URL');
    this.rapidAPIHost = this.config.get('X_RAPIDAPI_HOST');
    this.rapidAPIKey = this.config.get('X_RAPIDAPI_KEY');
    this.worldInsightsEndpoint = this.config.get('WORLD_TOTAL_NUMBERS');
  }

  async getWorldData({
    country = undefined,
    sortBy = 'country',
    orderBy = '1',
    limit = '300',
    page = '0',
  }: GetWorlDataOptions) {
    const requestOptions = {
      headers: {
        'content-type': 'application/json',
        'x-rapidapi-host': this.rapidAPIHost,
        'x-rapidapi-key': this.rapidAPIKey,
      },
    };
    if (country)
      Object.assign(requestOptions, { params: { country: country } });
    const response = this.http.get(this.countryDataEndpoint, requestOptions);
    return response.pipe(
      map(response => response.data),
      map(data => {
        return {
          data: data.response,
          count: data.results,
        };
      }),
      map(res => {
        const sorted = res.data.sort((a, b) => {
          const order = orderBy === 'asc' ? 1 : -1;
          const countryA = a[sortBy].toUpperCase();
          const countryB = b[sortBy].toUpperCase();
          return countryA < countryB
            ? order * -1
            : countryA > countryB
            ? order
            : 0;
        });
        return {
          data: sorted,
          count: res.count,
        };
      }),
      map(data => {
        const limited = data.data.splice(+page * +limit, limit);
        return { data: limited, count: data.count };
      }),
      map(data => {
        return data.data.map(country => {
          const additionalData = WorldHelper.getCountryAdditionalDetails(
            country.country,
          );
          if (additionalData) Object.assign(country, { ...additionalData });
          return country;
        });
      }),
      catchError(err => {
        Logger.error(`[Get World Stats] Error occured ${err}`);
        Logger.debug(typeof err);
        return of(
          new InternalServerErrorException({
            message: 'Failed to retrieve data',
          }),
        );
      }),
    );
  }

  async getWorldStats() {
    const response = this.http.get<any>(this.worldInsightsEndpoint);
    return response.pipe(map(res => res.data));
  }
}
