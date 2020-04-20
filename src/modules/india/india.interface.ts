/*
 * File: india.interface.ts
 * Project: staysafe-server
 * File Created: Wednesday, 8th April 2020 9:25:21 pm
 * Author: Adithya Sreyaj
 * -----
 * Last Modified: Friday, 10th April 2020 2:47:24 pm
 * Modified By: Adithya Sreyaj<adi.sreyaj@gmail.com>
 * -----
 */

import { Document } from 'mongoose';

export interface StateData {
  active: string;
  confirmed: string;
  deaths: string;
  deltaconfirmed: string;
  deltadeaths: string;
  deltarecovered: string;
  lastupdatedtime: string;
  recovered: string;
  state: string;
  statecode: string;
}

export interface StateDataMongoose extends StateData, Document {}
