'use strict'
/** 
  * @description main file of Rest API
  * @since 2019-02-02
  * @author Luis Navarro lu1tr0n
  * @file Filename: userRoute.js
*/

// Import express library
 const express = require('express');

 // Import UserController
 const userController = require('../controllers/userController');

 // Instantiate express
 let app = express();

 // Import librery authentication
 const auth = require('../security/authentication');

/**
 * @description end point of the API REST 
 * @since 2019-02-02
 * @author Luis Navarro lu1tr0n
 */
 app.get('/users', auth.isAuthenticated, userController.allUsers);

 app.get('/user/:id', auth.isAuthenticated, userController.viewUser);

 app.post('/user', auth.isAuthenticated, userController.newUser);

 app.put('/user/:id', auth.isAuthenticated, userController.updateUser);

 app.delete('/user/:id', auth.isAuthenticated, userController.deleteUser);

 app.get('/profile', auth.isAuthenticated, userController.profile);

 // Export app
 module.exports = app;