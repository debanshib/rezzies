'use strict';
var crypto = require('crypto');
var mongoose = require('mongoose');
var _ = require('lodash');

var schema = new mongoose.Schema({
    name: {
        type: String
    },
    location: {
        type: String
    },
    avgDuration: {
    	type: Number
    }
});

mongoose.model('Restaurant', schema);
