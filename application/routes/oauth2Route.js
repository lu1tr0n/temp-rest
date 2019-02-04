'use strict'
/** 
  * @description main file of Rest API
  * @since 2019-02-02
  * @author Luis Navarro lu1tr0n
  * @file Filename: userRoute.js
*/

// Import express library
const express = require('express');

// Import library Standar Path
const path = require('path');

// security Oauth 2.0
let oauthController = require('../security/oath2');

// Instantiate express
let app = express();

 // Import librery authentication
 const auth = require('../security/authentication');

// Define to view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));
//app.set('view options', { layout:false, root: __dirname + '../views' } );
console.log(path.join(__dirname, '../views'));

 /**
 * @description end point of the API REST 
 * @since 2019-02-02
 * @author Luis Navarro lu1tr0n
 */
app.get('/authorize', auth.isAuthenticated, oauthController.authorization);

app.post('/authorize', auth.isAuthenticated, oauthController.decision);

app.post('/token', auth.isClientAuthenticated, oauthController.token);

  // Export app
  module.exports = app;