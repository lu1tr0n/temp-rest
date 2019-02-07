'use strict'
/** 
  * @description file controller for temp data
  * @author Luis Navarro lu1tr0n
  * @since 2019-02-07
  * @file Filename: tempController.js
  */

// Import temp model
const Temp = require('../models/tempModel');

// Import underscore library
const _ = require('underscore');

// Handle all temps @method GET
let allTemps = (req, res, next) => {
    
    // variables
    let since = req.query.since || 0;
    since = Number(since);

    let limit = req.query.limit || 5;
    limit = Number(limit);

    /**
     * the first in filter, the second return fields 
     */
    Temp.find( { /*state: true */ }, 'name color state')
        .skip(since)
        .limit(limit)
        .exec( (err, tempData) => {
            // Error
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            Temp.count( { state: true }, (err, counter) => {
                // Response
                res.json({
                    ok: true,
                    temp: tempData,
                    count: counter
                });
            });
        });
};

// Handle create temp actions @method POST
let newTemp = (req, res, next) => {

    // variable 
    let body = req.body;

    // Get data for POST
    let tempData = new User({
        name: body.name,
        color: body.color
    });

    // Save temp and check for errors
    tempData.save((err, tempDB) => {
        // Error saving data
        if (err) {
            res.status(400).json({
                ok: false,
                err
            });
        }

        // Success
        res.json({
            ok: true,
            message: 'New temp data created!',
            data: tempDB
        });
    });
};

// Handle view temp info @method GET
let viewTemp = (req, res, next) => {

    // get param the ID temp
    let tempID = req.params.id;

    Temp.findById(tempID, (err, temp) => {
        // Error
        if (err) {
            res.status(400).json({
                ok: false,
                err
            });
        } 
        // Success
        res.json({
            message: 'User Details loading..',
            data: temp
        });
    });
};


// Handle update temp info @method PUT
let updateTemp = (req, res, next) => {

    // definition variables
    let id = req.params.id;
    // body of data form, with pick filter only the fields need it
    let body = _.pick(req.body, ['name', 'color', 'state']);

    Temp.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, tempData) => {
        // Error
        if (err) {
            res.status(400).json(err);
        // Success
        }
        
        res.json({
            ok: true,
            message: 'Temp data info updated!',
            data: temp
        });
    });
};

// Handle delete temp @method DELETE
let deleteTemp = (req, res, next) => {
    // definition variables
    let id = req.params.id;

    // One way to delete a record is with the following instruction
    Temp.findByIdAndRemove( id, (err, tempDeleted) => {
        // Error
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        // No Found Temp
        if (!tempDeleted) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Data no found!'
                }
            });
        }        

        // Success
        res.json({
            ok: true,
            temp: tempDeleted
        });        
    });

};

/**
 * @description Export function for controller
 */
module.exports = {
    allTemps,
    viewTemp,
    newTemp,
    updateTemp,
    deleteTemp
}