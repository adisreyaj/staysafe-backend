/*
 * File: world.schema.ts
 * Project: staysafe-server
 * File Created: Friday, 10th April 2020 1:35:57 pm
 * Author: Adithya Sreyaj
 * -----
 * Last Modified: Friday, 10th April 2020 1:53:48 pm
 * Modified By: Adithya Sreyaj<adi.sreyaj@gmail.com>
 * -----
 */

import { Schema } from 'mongoose';
import { CountryData } from './world.interface';

export const CountrySchema = new Schema<CountryData>({
  country: String,
  cases: {
    new: String,
    active: Number,
    critical: Number,
    recovered: Number,
    total: Number,
  },
  deaths: {
    new: Number,
    total: Number,
  },
  tests: {
    total: Number,
  },
  day: String,
  time: String,
  flag: String,
  countryCode: String,
  region: String,
  subRegion: String,
  population: Number,
  geoData: {
    lat: Number,
    long: Number,
  },
});
