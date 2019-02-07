'use strict'
/** 
  * @description file for temp data model
  * @author Luis Navarro lu1tr0n
  * @since 2019-02-02
  * @file Filename: tempModel.js
  */

// import of external libraries
const mongoose = require('mongoose');
// Validator unique for mongoose
const uniqueValidator = require('mongoose-unique-validator');
// Definition Schema mongoose
let Schema = mongoose.Schema;

/**
 * @method that model the temp's data
 * @author Luis Navarro lu1tr0n
 * @since 2019-02-07
 * @param None
 */
let tempSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    state: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

// Validator unique message
tempSchema.plugin(uniqueValidator, { message: '{PATH} debe ser único' });

/**
 * @method get limit of table
 * @since 2019-02-07
 * @author Luis Navarro lu1tr0n
 * @param callback = function return data, limit = get the limit to return
 */
module.exports.get = (callback, limit) => {
    tempSchema.find(callback).limit(limit);
}

// Export temp model
module.exports = mongoose.model('temp', tempSchema);