/*
 * File: voice-call.interface.ts
 * Project: staysafe-server
 * File Created: Monday, 13th April 2020 11:53:59 pm
 * Author: Adithya Sreyaj
 * -----
 * Last Modified: Tuesday, 14th April 2020 12:05:29 am
 * Modified By: Adithya Sreyaj<adi.sreyaj@gmail.com>
 * -----
 */
export enum VoiceCallType {
  verification = 'VERIFICATION',
}

export class VoiceCallJobData {
  to: string;
  type: VoiceCallType;
}
