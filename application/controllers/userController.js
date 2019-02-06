'use strict'
/** 
  * @description file controller for user data
  * @author Luis Navarro lu1tr0n
  * @since 2019-02-02
  * @file Filename: userController.js
  */

// Import bcrypt library for cryptoghaphy
const bcrypt = require('bcrypt');

// Import user model
const User = require('../models/userModel');

// Import underscore library
const _ = require('underscore');

// Handle all users @method GET
let allUsers = (req, res, next) => {
    
    // variables
    let since = req.query.since || 0;
    since = Number(since);

    let limit = req.query.limit || 5;
    limit = Number(limit);

    /**
     * the first in filter, the second return fields 
     */
    User.find( { /*state: true */ }, 'name username email state')
        .skip(since)
        .limit(limit)
        .exec( (err, usersData) => {
            // Error
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            User.count( { state: true }, (err, counter) => {
                // Response
                res.json({
                    ok: true,
                    usersData,
                    count: counter
                });
            });
        });
};

// Handle create user actions @method POST
let newUser = (req, res, next) => {

    // variable 
    let body = req.body;

    // Get data for POST
    let userData = new User({
        name: body.name,
        username: body.username,
        password: bcrypt.hashSync(body.password, 10),
        email: body.email,
        gender: body.gender,
        telephone: body.telephone
    });

    // Save user and check for errors
    userData.save((err, userDB) => {
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
            message: 'New user created!',
            data: userDB
        });
    });
};

// Handle view user info @method GET
let viewUser = (req, res, next) => {

    // get param the ID user
    let userID = req.params.id;

    User.findById(userID, (err, user) => {
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
            data: user
        });
    });
};


// Handle update user info @method PUT
let updateUser = (req, res, next) => {

    // definition variables
    let id = req.params.id;
    // body of data form, with pick filter only the fields need it
    let body = _.pick(req.body, ['name', 'username', 'img', 'state']);

    User.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, userData) => {
        // Error
        if (err) {
            res.status(400).json(err);
        // Success
        }
        
        res.json({
            ok: true,
            message: 'User info updated!',
            data: user
        });
    });
};

// Handle delete user @method DELETE
let deleteUser = (req, res, next) => {
    // definition variables
    let id = req.params.id;

    // One way to delete a record is with the following instruction
    // User.findByIdAndRemove( id, (err, userDeleted) => {} );

    // Object for change state
    let changeState = {
        state: false
    };

    // The following instruction to disable
    User.findByIdAndUpdate( id, changeState, { new: true }, (err, userDeleted) => {
        // Error
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        // No Found User
        if (!userDeleted) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'User no found!'
                }
            });
        }

        // Success
        res.json({
            ok: true,
            user: userDeleted
        });
    });
};

// Handle profile of user
let profile = (req, res, next) => {
    if (!req.user) {
        return res.status(400).json({
            ok: false,
            message: 'No Log IN'
        });
    }

    // Success
    return res.json({
        ok: true,
        user: req.user
    });
};

/**
 * @description Export function for controller
 */
module.exports = {
    allUsers,
    viewUser,
    newUser,
    updateUser,
    deleteUser,
    profile
}