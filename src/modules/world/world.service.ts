/*
 * File: world.service.ts
 * Project: staysafe-server
 * File Created: Sunday, 5th April 2020 4:18:36 pm
 * Author: Adithya Sreyaj
 * -----
 * Last Modified: Friday, 10th April 2020 2:18:33 pm
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
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { WorldHelper } from './world.helper';
import { CountryData, CountryDataMongoose } from './world.interface';

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
  constructor(
    private config: ConfigService,
    private http: HttpService,
    @InjectModel('Country') private countryModel: Model<CountryDataMongoose>,
  ) {
    this.countryDataEndpoint = this.config.get('WORLD_STATS_URL');
    this.rapidAPIHost = this.config.get('X_RAPIDAPI_HOST');
    this.rapidAPIKey = this.config.get('X_RAPIDAPI_KEY');
    this.worldInsightsEndpoint = this.config.get('WORLD_TOTAL_NUMBERS');
  }

  /**
   * Get the country data with the option of filters
   * @param country - get data of a single country
   * @param sortBy - on what basis to sort the data
   * @param orderBy - how the data should be ordered (ascending or descending order)
   * @param limit - number of documents to be returned
   * @param page - which page to fetch
   *
   */
  async getWorldData({
    country = undefined,
    sortBy = 'country',
    orderBy = '1',
    limit = '300',
    page = '0',
  }: GetWorlDataOptions) {
    const query = {};
    if (country) Object.assign(query, { country });
    const countries = await this.countryModel
      .find(query)
      .limit(+limit)
      .skip(+page * +limit)
      .sort([[sortBy, +orderBy]])
      .lean()
      .exec();

    return countries;
  }

  /**
   * Inject the Country based data into MongoDB from the Source
   */
  async refreshWorldData() {
    const requestOptions = {
      headers: {
        'content-type': 'application/json',
        'x-rapidapi-host': this.rapidAPIHost,
        'x-rapidapi-key': this.rapidAPIKey,
      },
    };
    const response = this.http.get(this.countryDataEndpoint, requestOptions);
    return response.pipe(
      map(response => response.data),
      map(data => {
        return {
          data: data.response,
          count: data.results,
        };
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
      map(async data => {
        const savedData = await this.saveCountryData(data);
        if (savedData) {
          return 'Ingested Country Data';
        }
        return 'Failed to injest Country Data';
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

  /**
   * Save bulk data to Mongo DB
   * @param data - country array to be injested
   */
  private async saveCountryData(data: CountryData[]) {
    Logger.debug(`[Ingesting Data to Mongo]`);
    return await this.countryModel.insertMany(data);
  }
}
