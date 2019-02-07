'use strict'
/** 
  * @description main file of Rest API
  * @since 2019-02-07
  * @author Luis Navarro lu1tr0n
  * @file Filename: tempRoute.js
*/

// Import express library
 const express = require('express');

 // Import UserController
 const tempController = require('../controllers/tempController');

 // Instantiate express
 let app = express();

 // Import librery authentication
 const auth = require('../security/authentication');

 /**
 * @description end point of the API REST 
 * @since 2019-02-07
 * @author Luis Navarro lu1tr0n
 */
app.get('/temps', auth.isAuthenticated, tempController.allTemps);

 app.get('/temp/:id', auth.isAuthenticated, tempController.viewTemp);

 app.post('/temp', auth.isAuthenticated, tempController.newTemp);

 app.put('/temp/:id', auth.isAuthenticated, tempController.updateTemp);

 app.delete('/temp/:id', auth.isAuthenticated, tempController.deleteTemp);

 app.get('/temp/last', auth.isAuthenticated, tempController.lastTemp);

  // Export app
  module.exports = app;