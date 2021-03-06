'use strict';
var crypto = require('crypto');
var mongoose = require('mongoose');
var _ = require('lodash');

var schema = new mongoose.Schema({
    email: {
        type: String
    },
    phone: {
        type: Number
    },
    password: {
        type: String
    },
    type: {
        type: String,
        enum: ['employee', 'guest', 'admin'],
        required: true
    },
    salt: {
        type: String
    }
    // ,
    // twitter: {
    //     id: String,
    //     username: String,
    //     token: String,
    //     tokenSecret: String
    // },
    // facebook: {
    //     id: String
    // },
    // google: {
    //     id: String
    // }
});

schema.statics.findOrCreate = function(email){
    // console.log('in findOrCreate User static with email:', email)
    var self = this;
    if (email){
        return this.findOne({email: email})
        .then(function(user){
            // console.log('found existing user', user)
            return user;
        })
    }
    else {
        var newUser = new self();
        newUser.email = email;
        newUser.type = 'guest';
        // console.log('created new user', user)
        return newUser.save();
    }
};




// method to remove sensitive information from user objects before sending them out
schema.methods.sanitize = function () {
    return _.omit(this.toJSON(), ['password', 'salt']);
};

// generateSalt, encryptPassword and the pre 'save' and 'correctPassword' operations
// are all used for local authentication security.
var generateSalt = function () {
    return crypto.randomBytes(16).toString('base64');
};

var encryptPassword = function (plainText, salt) {
    var hash = crypto.createHash('sha1');
    hash.update(plainText);
    hash.update(salt);
    return hash.digest('hex');
};

schema.pre('save', function (next) {

    if (this.isModified('password')) {
        this.salt = this.constructor.generateSalt();
        this.password = this.constructor.encryptPassword(this.password, this.salt);
    }

    next();

});

schema.statics.generateSalt = generateSalt;
schema.statics.encryptPassword = encryptPassword;

schema.method('correctPassword', function (candidatePassword) {
    return encryptPassword(candidatePassword, this.salt) === this.password;
});

mongoose.model('User', schema);
