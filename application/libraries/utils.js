'use strict'
/** 
  * @description File utilily function
  * @since 2019-02-04
  * @author Luis Navarro lu1tr0n
  * @file Filename: utils.js
*/

/**
 * @description Import libraries for function
 */
const crypto = require('crypto');

/**
 * Return a random string
 *
 * @param {Number} len = length of string return
 * @param {String} chars
 * @return {Number}
 * @api private
 */
let randomValue = (howMany, chars) => {
    chars = chars || 'abcdefghijklmnopqrstuwxyzABCDEFGHIJKLMNOPQRSTUWXYZ0123456789';
    let rnd = crypto.randomBytes(howMany);
    let value = new Array(howMany);
    let len = Math.min(256, chars.length);
    let d = 256 / len;

    for (let i = 0; i < howMany; i++) {
        value[i] = chars[Math.floor(rnd[i] / d)]
    };

    return value.join('');
}

/**
 * @description Export functions
 */
module.exports = {
    randomValue
};