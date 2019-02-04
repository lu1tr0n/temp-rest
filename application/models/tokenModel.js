'use strict'
/** 
  * @description file that access token, a client of the application can make a request
  * @author Luis Navarro lu1tr0n
  * @since 2019-02-03
  * @file Filename: tokenModel.js
  */

  // Load library required of mongoose
  const mongoose = require('mongoose');

  // Define the structure of table code
  let TokenSchema = new mongoose.Schema({
      value: {
          type: String,
          unique: true,
          required: true
      },
      userId: {
          type: String,
          required: true
      },
      clientId: {
        type: String,
        required: true
    }
  });

  /**
   * @description Export the token's table in Mongoose model
   */
  module.exports = mongoose.model('token', TokenSchema);