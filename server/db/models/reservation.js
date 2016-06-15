
'use strict';
var crypto = require('crypto');
var mongoose = require('mongoose');
var _ = require('lodash');

var schema = new mongoose.Schema({
    beg: {
        type: Date
    },
    end: {
        type: Date
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    size: {
        type: Number
    },
    table: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Table'
    },
    status: {
        type: String,
        enum: ['open', 'reserved', 'claimed', 'transition', 'past', 'cancelled', 'skipped'],
        default: 'open'
    }
});


schema.statics.checkAvailability = function(restaurantId, qbeg, qend, size){
	return mongoose.model('Table')
	.find({
		restaurant: restaurantId,
		maxAvailable: { $gte: size},
		minAvailable: { $lte: size }})
	.populate('reservations')
	.then(function(tables){
		if (!tables){
			console.log('no tables available for that restaurant and size')
			return null;
		}
		var tableBooked;
		var newTables = tables.filter(function(table){
			if (table.reservations.length === 0){
					tableBooked = false;
			}
			else {
			table.reservations.forEach(function(reservation){
				console.log('reservation in checkAvailability: ', reservation)
				if (reservation.beg.toDateString() === qbeg.toDateString() || reservation.end.toDateString() === qend.toDateString()) {
					tableBooked = true;
					console.log('in A or B');
				}
				else if (reservation.beg.toDateString() < qbeg.toDateString() && reservation.end.toDateString() > qbeg.toDateString()) {
					tableBooked = true;
					console.log('in C');
				}
				else if (reservation.beg.toDateString() > qbeg.toDateString() && reservation.beg.toDateString() < qend.toDateString()) {
					tableBooked = true;
					console.log('in D');
				}
				else {
					tableBooked = false;
					console.log('in E')
				}
			})
		}
		console.log('table Booked? ', tableBooked)
		return !tableBooked;
	});
	if (newTables.length > 0) return newTables[0];
	else return null;
	})
}

mongoose.model('Reservation', schema);
