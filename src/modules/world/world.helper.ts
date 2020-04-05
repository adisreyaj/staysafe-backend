/*
 * File: world.helper.ts
 * Project: staysafe-server
 * File Created: Sunday, 5th April 2020 9:22:14 pm
 * Author: Adithya Sreyaj
 * -----
 * Last Modified: Sunday, 5th April 2020 9:29:21 pm
 * Modified By: Adithya Sreyaj<adi.sreyaj@gmail.com>
 * -----
 */
import { countries } from '../../assets/country.json';
import { CountryData } from 'src/core/interfaces/country.interface';

export interface CountryAdditionalDetails {
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

export class WorldHelper {
  static getCountryAdditionalDetails(countryName: string) {
    const country = <CountryData>(
      countries.find(country => country.name === countryName)
    );
    if (country) {
      return this.extractRequiredDataFromCountry(country);
    }
  }

  private static extractRequiredDataFromCountry(
    country: CountryData,
  ): CountryAdditionalDetails {
    const {
      flag,
      alpha2Code: countryCode,
      region,
      subregion: subRegion,
      population,
      latlng,
    } = country;
    return {
      flag,
      countryCode,
      region,
      subRegion,
      population,
      geoData: {
        lat: latlng[0],
        long: latlng[1],
      },
    };
  }
}
