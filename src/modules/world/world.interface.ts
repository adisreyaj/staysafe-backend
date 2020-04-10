/*
 * File: world-data.interface.ts
 * Project: staysafe-server
 * File Created: Wednesday, 8th April 2020 8:35:04 pm
 * Author: Adithya Sreyaj
 * -----
 * Last Modified: Friday, 10th April 2020 2:47:03 pm
 * Modified By: Adithya Sreyaj<adi.sreyaj@gmail.com>
 * -----
 */

import { Document } from 'mongoose';

export interface CountryData {
  country: string;
  cases: Cases;
  deaths: Deaths;
  tests: Tests;
  day: string;
  time: string;
  flag?: string;
  countryCode?: string;
  region?: Region;
  subRegion?: string;
  population?: number;
  geoData?: GeoData;
}

export interface CountryDataMongoose extends CountryData, Document {}

export interface Cases {
  new: null | string;
  active: number;
  critical: number;
  recovered: number;
  total: number;
}

export interface Deaths {
  new: null | string;
  total: number;
}

export interface GeoData {
  lat: number;
  long: number;
}

export enum Region {
  Africa = 'Africa',
  Americas = 'Americas',
  Asia = 'Asia',
  Europe = 'Europe',
  Oceania = 'Oceania',
}

export interface Tests {
  total: number | null;
}
