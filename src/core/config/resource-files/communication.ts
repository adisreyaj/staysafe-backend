/*
 * File: communication.ts
 * Project: staysafe-server
 * File Created: Monday, 13th April 2020 11:17:22 pm
 * Author: Adithya Sreyaj
 * -----
 * Last Modified: Tuesday, 14th April 2020 12:37:43 am
 * Modified By: Adithya Sreyaj<adi.sreyaj@gmail.com>
 * -----
 */

/**
 * SMS Messages are concatenated using ``` + ``` marks so that they get rendered
 * properly. Adding backticks ``` ` ``` seem to show the message in a disoriented manner.
 */
export const smsResources = {
  registerMessage:
    'Welcome to Stay Safe - Learn, Educate and Care.\n' +
    'Stand together for fighting this pandemic away from the world. Do you part.\n' +
    'Be alert, learn about the precautions and stay safe.\n\n' +
    '#StaySafe Team',
};

export const voiceCallResources = {
  verificationCallWelcomeMessage: `Hello there, you have opted in to receive notifications from StaySafe website.`,
  verificationCallGatherMessage: `Please confirm you subscription by pressing 1 on your phone.`,
  verificationCallWorngInputMessage: 'Please provide a valid input',
  verificationSuccessMessage:
    'You have successfully opted in for recieveing notification. Be Safe and Stay Safe... Good bye!',
  verificationFailureMessage:
    'Failed to verify you...please try again or contact support',
};
