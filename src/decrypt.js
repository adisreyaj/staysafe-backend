/*
 * File: encrypt.js
 * Project: staysafe-server
 * File Created: Saturday, 11th April 2020 12:18:32 am
 * Author: Adithya Sreyaj
 * -----
 * Last Modified: Saturday, 11th April 2020 1:19:30 am
 * Modified By: Adithya Sreyaj<adi.sreyaj@gmail.com>
 * -----
 */

const CryptoJS = require('crypto-js');
const path = require('path');
const fs = require('fs').promises;
const dotenv = require('dotenv');

dotenv.config();
(async () => {
  try {
    const ciphertext = (
      await fs.readFile(path.join(__dirname, './firebase_config.staysafe'))
    ).toString();

    const decryptedWords = CryptoJS.AES.decrypt(
      ciphertext,
      process.env.ENCRYPT_KEY,
    );
    const config = JSON.parse(decryptedWords.toString(CryptoJS.enc.Utf8));
    await fs.writeFile(
      path.join(__dirname, './firebase_config.json'),
      JSON.stringify(config),
    );
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
