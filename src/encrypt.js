/*
 * File: encrypt.js
 * Project: staysafe-server
 * File Created: Saturday, 11th April 2020 12:18:32 am
 * Author: Adithya Sreyaj
 * -----
 * Last Modified: Saturday, 11th April 2020 1:20:08 am
 * Modified By: Adithya Sreyaj<adi.sreyaj@gmail.com>
 * -----
 */

const CryptoJS = require('crypto-js');
const fs = require('fs').promises;
const path = require('path');
const config = require('./firebase_config.json');
const dotenv = require('dotenv');

dotenv.config();
(async () => {
  try {
    const ciphertext = CryptoJS.AES.encrypt(
      JSON.stringify(config),
      process.env.ENCRYPT_KEY,
    ).toString();
    await fs.writeFile(
      path.join(__dirname, './firebase_config.staysafe'),
      ciphertext,
    );
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
