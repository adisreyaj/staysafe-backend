/*
 * File: news.service.ts
 * Project: staysafe-server
 * File Created: Friday, 10th April 2020 3:12:32 pm
 * Author: Adithya Sreyaj
 * -----
 * Last Modified: Friday, 10th April 2020 3:49:30 pm
 * Modified By: Adithya Sreyaj<adi.sreyaj@gmail.com>
 * -----
 */

import { Injectable, HttpService } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { map } from 'rxjs/operators';

@Injectable()
export class NewsService {
  newsEndpoint: string;
  constructor(private configService: ConfigService, private http: HttpService) {
    const newsAPIKey = this.configService.get('NEWSAPI_KEY');
    this.newsEndpoint = `${this.configService.get(
      'NEWSAPI_URL',
    )}/top-headlines?apiKey=${newsAPIKey}`;
  }
  getIndiaLatestNews({ limit = 10 }) {
    const indiaNews = this.http.get(
      `${this.newsEndpoint}&country=in&pageSize=${limit}`,
    );
    return indiaNews.pipe(map(news => news.data));
  }

  getWorldLatestNews() {}

  refreshIndiaNews() {}
}
