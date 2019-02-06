'use strict'
/** 
  * @description main file with configuration global
  * @since 2019-02-02
  * @author Luis Navarro lu1tr0n
  * @file Filename: config.js
*/

const config = {
    /**
    * @description Port
    */
    port:  process.env.PORT || 8080,

    /**
    * @description Enviroment (production or development)
    */
    enviroment: process.env.NODE_ENV || 'dev',

    /**
     * @description url connection database
     */
    urlDB: process.env.URL_DB || 'mongodb://localhost:27017/temp-rest',

    /**
     * @description Expiration of token
     */
    expirationToken : process.env.EXPIRATION_TOKEN  || (60 * 60 * 24 * 30),

    seed: process.env.SEED || 'este-es-el-seed-desarrollo',

    /**
     * @description String secret Session
     */
    secretSession: process.env.SECRETSESSION || 'this-is-secret-hugo'
};
// Export configurations
module.exports = config;