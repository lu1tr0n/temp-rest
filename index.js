'use strict'
/** 
  * @description main file that controls the end point
  * @since 2019-02-01
  * @author Luis Navarro lu1tr0n
  * @file Filename: index.js
*/

// Import express library
const express = require('express');
// Import view engine librery
const ejs = require('ejs');
// Import file for authentication
const passport = require('passport');
// Import body-parser library
const bodyParser = require('body-parser');
// Library Standar
const path = require('path');
// Initialize the app
const app = express();
// Import librery session 
const session = require('express-session');
// Import configuration global
const config = require('./config/config');
// Import CORS for header-accept: * 
const cors = require('cors')

// header configuration and cors
app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// Session
app.use(session({
  secret: config.secretSession,
  saveUninitialized: true,
  resave: true
}));

// Initizialice passport
app.use(passport.initialize());

// setup global api temp-rest
app.use(require('./application/api'));

// send message for default URL
app.get('/', (req, res) => res.send('REST API temp - HUGO APP Challenge'));

// Connection database
require('./config/database');

// Launch app to listen to specified port
app.listen(config.port, () => {
    console.log("Running Rest API Temp on port " + config.port);
});