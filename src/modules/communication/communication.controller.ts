/*
 * File: communication.controller.ts
 * Project: staysafe-server
 * File Created: Sunday, 5th April 2020 2:53:51 pm
 * Author: Adithya Sreyaj
 * -----
 * Last Modified: Sunday, 5th April 2020 4:14:32 pm
 * Modified By: Adithya Sreyaj<adi.sreyaj@gmail.com>
 * -----
 */

import { Controller, Post, Header, Body } from '@nestjs/common';
import { twiml } from 'twilio';
import { InboundCallDTO } from './inbound-call.dto';

@Controller('com')
export class CommunicationController {
  @Post('/call/inbound')
  @Header('Content-Type', 'text/xml')
  inComingCall(@Body() body: InboundCallDTO) {
    const twiML = new twiml.VoiceResponse();

    /** helper function to set up a <Gather> */
    function gather() {
      const gatherNode = twiML.gather({ numDigits: 1 });
      gatherNode.say('For Knowing current global numbers, Press 1.');
    }
    if (!body.Digits) {
      twiML.say(
        { voice: 'alice' },
        'Welcome to StaySafe, creating awareness and keeping you informed',
      );
      // If no input was sent, use the <Gather> verb to collect user input
      gather();
    }
    switch (+body.Digits) {
      case 1:
        twiML.say('Current World Stats are as follows');
        twiML.say('Total Deaths: 120500');
        twiML.say('Total Active: 520500');

        break;
      case 2:
        twiML.say('You need support. We will help!');
        break;
      default:
        twiML.say("Sorry, I don't understand that choice.");
        twiML.pause();
        gather();
        break;
    }
    // If the user doesn't enter input, loop
    return twiML.toString();
  }
}
