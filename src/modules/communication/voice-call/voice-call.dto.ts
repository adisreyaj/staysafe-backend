/*
 * File: inbound-call.dto.ts
 * Project: staysafe-server
 * File Created: Sunday, 5th April 2020 3:06:11 pm
 * Author: Adithya Sreyaj
 * -----
 * Last Modified: Tuesday, 14th April 2020 12:36:15 am
 * Modified By: Adithya Sreyaj<adi.sreyaj@gmail.com>
 * -----
 */

export class InboundCallDTO {
  AccountSid: string;
  ApiVersion: string;
  ApplicationSid: string;
  CallSid: string;
  CallStatus: string;
  Called: string;
  CalledCity: string;
  CalledCountry: string;
  CalledState: string;
  CalledZip: string;
  Caller: string;
  CallerCity: string;
  CallerCountry: string;
  CallerState: string;
  CallerZip: string;
  Digits: string;
  Direction: string;
  From: string;
  FromCity: string;
  FromCountry: string;
  FromState: string;
  FromZip: string;
  To: string;
  ToCity: string;
  ToCountry: string;
  ToState: string;
  ToZip: string;
}
