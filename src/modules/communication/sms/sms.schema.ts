/*
 * File: sms.schema.ts
 * Project: staysafe-server
 * File Created: Monday, 13th April 2020 10:53:05 pm
 * Author: Adithya Sreyaj
 * -----
 * Last Modified: Monday, 13th April 2020 10:54:22 pm
 * Modified By: Adithya Sreyaj<adi.sreyaj@gmail.com>
 * -----
 */

import { Schema } from 'mongoose';

export const SMSSchema = new Schema(
  {
    phone: String,
    verified: { type: Boolean, default: false },
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: true,
    },
  },
);
