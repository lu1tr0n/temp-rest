'use strict'
/** 
  * @description file controller for client data
  * @author Luis Navarro lu1tr0n
  * @since 2019-02-03
  * @file Filename: clientController.js
  */

// Import client model
const Client = require('../models/clientModel');

// Import underscore library
const _ = require('underscore');

// Create client @method POST
let newClient = (req, res, next) => {

    // Define variables
    let body = req.body;
    let userData = req.user;

    // Create a new instance of the client model
    let client = new Client({
        // Set the client properties that came from the POST data
        name: body.name,
        id: body.id,
        secret: body.secret,
        userId: userData._id
    });

    // Save the client
    client.save((err, clientData)=>{
        if(err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        // Success
        res.json({
            ok: true,
            message: 'Client added to the locker',
            data: clientData
        });
    });
}

// Get data client @method GET
let viewClient = (req, res, next) => {
    // Define variables
    let userData = req.user;

    // Use the client model to find all 
    Client.find( {userId: userData._id}, (err, clientData) => {
        // Error
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        // Success
        res.json({
            ok: true,
            client: clientData
        });
    });
}

/**
 * @description Export module for client
 */
module.exports = {
    newClient,
    viewClient
};