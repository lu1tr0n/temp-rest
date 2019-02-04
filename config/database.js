'use strict'
/** 
  * @description main file with configuration database
  * @since 2019-02-02
  * @author Luis Navarro lu1tr0n
  * @file Filename: database.js
*/

// Import mongoose library
let mongoose = require('mongoose');

// Configuration
let config = require('./config');

/**
 * Connection database
 */
// let urlDB;

/* if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/temp-rest';
} else {
    urlDB = process.env.MONGO_URI;
}
process.env.URLDB = urlDB; */

mongoose.connect(config.urlDB, (err, res) => {

    if (err) throw err;

    console.log('Base de datos ONLINE');

});