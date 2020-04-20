/*
 * File: india.helper.ts
 * Project: staysafe-server
 * File Created: Monday, 20th April 2020 11:40:06 pm
 * Author: Adithya Sreyaj
 * -----
 * Last Modified: Monday, 20th April 2020 11:50:12 pm
 * Modified By: Adithya Sreyaj<adi.sreyaj@gmail.com>
 * -----
 */

import { StateData } from './india.interface';

export class IndiaHelper {
  public static constructDailyStatsPushMessage(
    data: Omit<StateData, 'state statecode'>,
  ) {
    const { active, recovered, deaths, confirmed } = data;
    const body = `Here is the daily report of COVID19 Cases:
          Active: ${active}
          Confirmed: ${confirmed}
          Recovered: ${recovered},
          Deaths: ${deaths}
          #StaySafe - do your part
          `;
    const title = 'COVID 19 Stats for India for the day';
    return { title, body };
  }
}
