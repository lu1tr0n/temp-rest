'use strict'
/** 
  * @description file for user data model
  * @author Luis Navarro lu1tr0n
  * @since 2019-02-02
  * @file Filename: userModel.js
  */

// import of external libraries
const mongoose = require('mongoose');
// Validator unique for mongoose
const uniqueValidator = require('mongoose-unique-validator');
// Definition Schema mongoose
let Schema = mongoose.Schema;

/**
 * @method that model the user's data
 * @author Luis Navarro lu1tr0n
 * @since 2019-02-02
 * @param None
 */
let userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    gender: String,
    telephone: String,
    img: {
        type: String,
        required: false
    },
    state: {
        type: Boolean,
        default: true
    },
    last_session: {
        type: Date,
        default: Date.now
    },
    create_date: {
        type: Date,
        default: Date.now
    }
});

/**
 * @description method delete object not return password
 * @since 2019-02-02
 */
userSchema.methods.toJSON = function() {

    let user = this;
    let userObject = user.toObject();
    delete userObject.password;

    return userObject;
}

// Validator unique message
userSchema.plugin(uniqueValidator, { message: '{PATH} debe ser único' });

/**
 * @method get limit of user
 * @since 2019-02-02
 * @author Luis Navarro lu1tr0n
 * @param callback = function return data, limit = get the limit to return
 */
module.exports.get = (callback, limit) => {
    userSchema.find(callback).limit(limit);
}

// Export User model
module.exports = mongoose.model('user', userSchema);