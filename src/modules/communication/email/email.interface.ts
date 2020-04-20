/*
 * File: email.interface.ts
 * Project: staysafe-server
 * File Created: Monday, 13th April 2020 8:20:37 pm
 * Author: Adithya Sreyaj
 * -----
 * Last Modified: Monday, 13th April 2020 8:21:46 pm
 * Modified By: Adithya Sreyaj<adi.sreyaj@gmail.com>
 * -----
 */

export interface MailData {
  to: string;
  from: string;
  subject: string;
  text: string;
  html: string;
}
