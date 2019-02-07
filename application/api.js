'use strict'
/** 
  * @description main file of Rest API
  * @since 2019-02-01
  * @author Luis Navarro lu1tr0n
  * @file Filename: api.js
*/

// Import express library
const express = require('express');
// We instantiared the express app variable
const app = express();

// Use user end point 
app.use('/api', require('./routes/userRoute'));

// Use client end point
app.use('/api', require('./routes/clientRoute'));

// Use oauth 2.0 security
app.use('/api/oauth2', require('./routes/oauth2Route'));

// Use temp data end point
app.use('/api', require('./routes/tempRoute'));

// Export
module.exports = app;