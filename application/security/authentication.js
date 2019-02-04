'use strict'
/** 
  * @description ile with authentication settings
  * @since 2019-02-03
  * @author Luis Navarro lu1tr0n
  * @file Filename: authentication.js
*/

/**
 * @description Import libreries for authentication
 */
const passport = require('passport');
const BasicAuthentication = require('passport-http').BasicStrategy;
const BearerAuthentication = require('passport-http-bearer').Strategy;
const User = require('../models/userModel');
const Client = require('../models/clientModel');
const Token = require('../models/tokenModel');
const bcrypt = require('bcrypt');

/**
 * @description Passport is used to perform the functions of verifying user data
 */
passport.use(new BasicAuthentication(
    (username, password, callback) => {
        User.findOne( {username: username}, (err, user) => {
            /**
             * @description Error
             */
            if (err) {
                return callback(err);
            }

            /**
             * @description No user found with that username
             */
            if (!user) {
                return callback(null, false);
            }

            /**
             * @description Ensure that the password entered is correct
             */
            if (!bcrypt.compareSync(password, user.password)) {
                return callback(null, false);
            }

            /**
             * Sucess
             */
            return callback(null, user);
        });
    }
));

/**
 * @description Get data for client verified 
 */
passport.use('client-basic', new BasicAuthentication(
    (username, password, callback) => {
        Client.findOne({ id: username }, (err, clientData) => {
            // Error
            if (err) {
                return callback(err);
            }

            // No found client or Bad password
            if (!clientData || clientData.secret !== password) {
                return callback(null, false);
            }

            // Success
            return callback(null, clientData);
        });
    }
));

/**
 * @description Get validate token
 */
passport.use(new BearerAuthentication( 
    (accessToken, callback) => {
        // Search token
        Token.findOne({value: accessToken}, (err, tokenData) => {
            // Error
            if (err) {
                return callback(err);
            }
            // No token found
            if (!token) {
                return callback(null, false);
            }

            // Search data user
            User.findOne({ _id: tokenData.userId}, (err, userData) => {
                // Error
                if (err) {
                    return callback(err);
                }

                // No user found
                if (!userData) {
                    return callback(null, false);
                }

                // Success
                callback(null, userData, { scope: '*' });
            });
        });
    }
));

/**
 * @description Export function
 */
module.exports = {
    isAuthenticated      : passport.authenticate(['basic', 'bearer'], { session: false }),
    isClientAuthenticated: passport.authenticate('client-basic', { session: false }),
    isBearerAuthenticated: passport.authenticate('bearer', { session: false })
}