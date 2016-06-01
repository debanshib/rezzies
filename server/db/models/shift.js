'use strict';
var crypto = require('crypto');
var mongoose = require('mongoose');
var _ = require('lodash');

var schema = new mongoose.Schema({
    scheduled: {
        type: Date
    },
    actual: {
        type: Date
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant'
    },
    status: {
        type: String,
        enum: ['pending', 'cancelled', 'active', 'past', 
        'skipped']
    }
});

mongoose.model('Shift', schema);
