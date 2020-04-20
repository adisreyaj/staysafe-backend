/*
 * File: country.interface.ts
 * Project: staysafe-server
 * File Created: Sunday, 5th April 2020 9:15:09 pm
 * Author: Adithya Sreyaj
 * -----
 * Last Modified: Sunday, 5th April 2020 9:18:57 pm
 * Modified By: Adithya Sreyaj<adi.sreyaj@gmail.com>
 * -----
 */

export interface CountryData {
  name: string;
  topLevelDomain: string[];
  alpha2Code: string;
  alpha3Code: string;
  callingCodes: string[];
  capital: string;
  altSpellings: string[];
  region: Region;
  subregion: string;
  population: number;
  latlng: number[];
  demonym: string;
  area: number | null;
  gini: number | null;
  timezones: string[];
  borders: string[];
  nativeName: string;
  numericCode: null | string;
  currencies: Currency[];
  languages: Language[];
  translations: Translations;
  flag: string;
  regionalBlocs: RegionalBloc[];
  cioc: null | string;
}

export interface Currency {
  code: null | string;
  name: null | string;
  symbol: null | string;
}

export interface Language {
  iso639_1: null | string;
  iso639_2: string;
  name: string;
  nativeName: string;
}

export enum Region {
  Africa = 'Africa',
  Americas = 'Americas',
  Asia = 'Asia',
  Empty = '',
  Europe = 'Europe',
  Oceania = 'Oceania',
  Polar = 'Polar',
}

export interface RegionalBloc {
  acronym: string;
  name: string;
  otherAcronyms: string[];
  otherNames: string[];
}

export interface Translations {
  de: null | string;
  es: null | string;
  fr: null | string;
  ja: null | string;
  it: null | string;
  br: string;
  pt: string;
  nl: null | string;
  hr: null | string;
  fa: string;
}
