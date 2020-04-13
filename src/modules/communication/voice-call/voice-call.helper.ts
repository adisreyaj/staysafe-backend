/*
 * File: voice-call.helper.ts
 * Project: staysafe-server
 * File Created: Monday, 13th April 2020 11:44:25 pm
 * Author: Adithya Sreyaj
 * -----
 * Last Modified: Tuesday, 14th April 2020 12:38:15 am
 * Modified By: Adithya Sreyaj<adi.sreyaj@gmail.com>
 * -----
 */

import { voiceCallResources } from 'src/core/config/resource-files/communication';

export class VoiceCallHelper {
  static constructVerificationCallWelcomeMessage() {
    return voiceCallResources.verificationCallWelcomeMessage;
  }
  static constructVerificationCallGatherMessage() {
    return voiceCallResources.verificationCallGatherMessage;
  }
  static constructVerificationCallWorngInputMessage() {
    return voiceCallResources.verificationCallWorngInputMessage;
  }
  static constructVerificationSuccessMessage() {
    return voiceCallResources.verificationSuccessMessage;
  }
  static constructVerificationFailureMessage() {
    return voiceCallResources.verificationFailureMessage;
  }
}
