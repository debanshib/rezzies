'use strict';
var crypto = require('crypto');
var mongoose = require('mongoose');
var _ = require('lodash');

var schema = new mongoose.Schema({
    minAvailable: {
        type: Number
    },
    maxAvailable: {
        type: Number
    },
    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant'
    },
    reservation: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Reservation'
    }]
});

// schema.statics.checkAvailability = function(restaurantId, date, size){
//     this.find({restaurant: restaurantId, date: { $gte: beg, $lte: end }, {status: tentative}, size: { $gte: min, $lte: max }})
//     .then(function(table){
//         if (!table) return false;
//         else return true;
//     })
// }

// schema.method.blockTable = function(tableId, date, restaurantAvgTime){

// }

mongoose.model('Table', schema);
