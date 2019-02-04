'use strict'
/** 
  * @description File with OAuth 2.0 setup
  * @since 2019-02-03
  * @author Luis Navarro lu1tr0n
  * @file Filename: oauth2.js
*/

/**
 * @description Import libreries for authentication
 */
const oauth2orize = require('oauth2orize');
const User = require('../models/userModel');
const Client = require('../models/clientModel');
const Token = require('../models/tokenModel');
const Code = require('../models/codeModel');

// Library utils
const utils = require('../libraries/utils');

// Initialize for server oauth 2.0
let server = oauth2orize.createServer();

// Organize the content of the client
server.serializeClient( (client, callback) => {
    return callback(null, client._id);
});
  
// Disorganize the content of the client
server.deserializeClient( (id, callback) => {
    Client.findOne({ _id: id }, (err, client) => {
        // Error
        if (err) { 
            return callback(err); 
        }
        // Success
        return callback(null, client);
    });
});

// The OAuth 2.0 framework specifies several grant types for different use cases, 
// as well as a framework for creating new grant types.
server.grant(oauth2orize.grant.code((client, redirectUri, user, ares, callback) => {
    // Create a new authorization code
    var code = new Code({
      value: utils.randomValue(16),
      clientId: client._id,
      redirectUri: redirectUri,
      userId: user._id
    });
  
    // Save the auth code and check for errors
    code.save( (err) => {
      if (err) { return callback(err); }
  
      callback(null, code.value);
    });
}));

// Issue token if the user's information is valid
server.exchange(oauth2orize.exchange.code( (client, code, redirectUri, callback) => {
    Code.findOne({ value: code }, (err, authCode) => {
        // Error
        if (err) { 
          return callback(err); 
        }
        // No define authCode Error
        if (authCode === undefined) { 
            return callback(null, false); 
        }
        // No egual ID's clients
        if (client._id.toString() !== authCode.clientId) { 
            return callback(null, false); 
        }
        // No egual redirects
        if (redirectUri !== authCode.redirectUri) { 
            return callback(null, false); 
        }
  
        // Delete auth code now that it has been used
        authCode.remove((err) => {
            // Error
            if(err) { 
                return callback(err); 
            }
  
            // Create a new access token
            var token = new Token({
                value: utils.randomValue(256),
                clientId: authCode.clientId,
                userId: authCode.userId
            });
  
            // Save the access token and check for errors
            token.save( (err) => {
                // Error
                if (err) { 
                    return callback(err); 
                }
                // Success
                callback(null, token);
            });
        });
    });
}));

// Create to authorizacion
let authorization = [
    server.authorization((clientId, redirectUri, callback) => {
        // Search client
        Client.findOne({ id: clientId }, (err, client) => {
            // Error
            if (err) { 
                return callback(err); 
            }
            // Success
            return callback(null, client, redirectUri);
        });
    }),
    (req, res, next) => {
        // Define variables
        let userData = req.user;
        let authData = req.oauth2;
        // View for desicion
        res.render('permition', { 
            transactionID: authData.transactionID, 
            user: userData, 
            client: authData.client 
        });
    }
  ]; // End

// Define for Process the user's decision
let decision = [
    server.decision()
];

// Handles customer requests
let token = [
    server.token(),
    server.errorHandler()
];

/**
 * Export 
 */
module.exports = {
    authorization,
    decision,
    token
};