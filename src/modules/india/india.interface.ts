/*
 * File: india.interface.ts
 * Project: staysafe-server
 * File Created: Wednesday, 8th April 2020 9:25:21 pm
 * Author: Adithya Sreyaj
 * -----
 * Last Modified: Wednesday, 8th April 2020 9:59:26 pm
 * Modified By: Adithya Sreyaj<adi.sreyaj@gmail.com>
 * -----
 */

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
