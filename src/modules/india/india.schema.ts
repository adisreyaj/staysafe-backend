/*
 * File: india.schema.ts
 * Project: staysafe-server
 * File Created: Friday, 10th April 2020 2:44:34 pm
 * Author: Adithya Sreyaj
 * -----
 * Last Modified: Friday, 10th April 2020 2:45:06 pm
 * Modified By: Adithya Sreyaj<adi.sreyaj@gmail.com>
 * -----
 */

import { Schema } from 'mongoose';

export const IndiaSchema = new Schema({
  active: String,
  confirmed: String,
  deaths: String,
  deltaconfirmed: String,
  deltadeaths: String,
  deltarecovered: String,
  lastupdatedtime: String,
  recovered: String,
  state: String,
  statecode: String,
});
