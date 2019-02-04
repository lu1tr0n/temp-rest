'use strict'
/** 
  * @description file that store the authorization code
  * @author Luis Navarro lu1tr0n
  * @since 2019-02-03
  * @file Filename: codeModel.js
  */

  // Load library required of mongoose
  const mongoose = require('mongoose');

  // Define the structure of table code
  let CodeSchema = new mongoose.Schema({
      value: {
          type: String,
          unique: true,
          required: true
      },
      redirectUri: {
          type: String,
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
   * @description Export the code's table in Mongoose model
   */
  module.exports = mongoose.model('code', CodeSchema);