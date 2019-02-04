'use strict'
/** 
  * @description main file of Rest API
  * @since 2019-02-03
  * @author Luis Navarro lu1tr0n
  * @file Filename: clientRoute.js
*/

// Import express library
const express = require('express');

// Import UserController
const clientController = require('../controllers/clientController');

// Instantiate express
let app = express();

// Import librery authentication
const auth = require('../security/authentication');

/**
 * @description end point of the API REST 
 * @since 2019-02-03
 * @author Luis Navarro lu1tr0n
 */
app.post('/client', auth.isAuthenticated, clientController.newClient);

app.get('/client', auth.isAuthenticated, clientController.viewClient);

 // Export app
 module.exports = app;