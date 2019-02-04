'use strict'
/** 
  * @description file to manage the user's access data to the applications
  * @author Luis Navarro lu1tr0n
  * @since 2019-02-03
  * @file Filename: clientModel.js
  */

  // Load library required of mongoose
  const mongoose = require('mongoose');

  // Define the structure of table client
  let ClientSchema = new mongoose.Schema({
      name: {
          type: String,
          unique: true,
          required: true
      },
      id: {
          type: String,
          required: true
      },
      secret: {
          type: String,
          required: true
      },
      userId: {
          type: String,
          required: true
      }
  });

  /**
   * @description Export the client's table in Mongoose model
   */
  module.exports = mongoose.model('client', ClientSchema);