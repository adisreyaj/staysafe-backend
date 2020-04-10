/*
 * File: india.service.ts
 * Project: staysafe-server
 * File Created: Wednesday, 8th April 2020 9:24:45 pm
 * Author: Adithya Sreyaj
 * -----
 * Last Modified: Friday, 10th April 2020 2:57:13 pm
 * Modified By: Adithya Sreyaj<adi.sreyaj@gmail.com>
 * -----
 */

import {
  Injectable,
  HttpService,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { map, filter, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { StateData, StateDataMongoose } from './india.interface';

export interface GetIndiaDataOptions {
  state: string;
  sortBy: 'state' | 'cases' | 'deaths';
  orderBy: string;
  limit: string;
  page: string;
}
@Injectable()
export class IndiaService {
  indiaDataEndpoint: string;
  constructor(
    private config: ConfigService,
    private http: HttpService,
    @InjectModel('India') private indiaModel: Model<StateDataMongoose>,
  ) {
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

  async getIndiaStateData({
    state = undefined,
    sortBy = 'state',
    orderBy = '1',
    limit = '100',
    page = '0',
  }: GetIndiaDataOptions) {
    const query = {};
    if (state) Object.assign(query, { state });
    const states = await this.indiaModel
      .find(query)
      .limit(+limit)
      .skip(+page * +limit)
      .sort([[sortBy, +orderBy]])
      .lean()
      .exec();

    return states;
  }

  refreshIndiaData() {
    const response = this.getIndiaData();
    return response.pipe(
      map(data => data.statewise),
      map(states => states.filter(state => state.statecode !== 'TT')),
      map(async data => {
        const savedData = await this.saveIndiaData(data);
        if (savedData) {
          return 'Ingested India Data';
        }
        return 'Failed to injest India Data';
      }),
      catchError(err => {
        Logger.error(`[Get India Data] Error occured ${err}`);
        return of(
          new InternalServerErrorException({
            message: 'Failed to retrieve data',
          }),
        );
      }),
    );
  }

  /**
   * Save bulk data to Mongo DB
   * @param data - country array to be injested
   */
  private async saveIndiaData(data: StateData[]) {
    Logger.debug(`[Ingesting Data to Mongo]`);
    return await this.indiaModel.insertMany(data);
  }
}
