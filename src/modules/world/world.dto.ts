/*
 * File: world.dto.ts
 * Project: staysafe-server
 * File Created: Friday, 10th April 2020 1:47:00 pm
 * Author: Adithya Sreyaj
 * -----
 * Last Modified: Friday, 10th April 2020 1:48:56 pm
 * Modified By: Adithya Sreyaj<adi.sreyaj@gmail.com>
 * -----
 */

export class CountryDTO {
  country: string;
  cases: {
    new: string;
    active: number;
    critical: number;
    recovered: number;
    total: number;
  };
  deaths: {
    new: number;
    total: number;
  };
  tests: {
    total: number;
  };
  day: string;
  time: string;
  flag: string;
  countryCode: string;
  region: string;
  subRegion: string;
  population: number;
  geoData: {
    lat: number;
    long: number;
  };
}
