'use strict';
var crypto = require('crypto');
var mongoose = require('mongoose');
var _ = require('lodash');

var schema = new mongoose.Schema({
    date: {
        type: Date
    },
    actualBeg: {
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

schema.statics.checkAvailability = function(restaurantId, date, size){
	console.log('in checkAvailability static with restaurantId, date, size: ', restaurantId, date, size)
	var avgDuration;
	var qbeg = new Date(date);
	var qend;
	return mongoose.model('Restaurant').findById(restaurantId)
	.then(function(restaurant){
		console.log('in checkAvailability static, found restaurant: ', restaurant)
		var avgDuration = restaurant.avgDuration;
		var x = qbeg;
		qend = x.setMinutes(x.getMinutes()+avgDuration);
		return mongoose.model('Table')
		.find({
			restaurant: restaurantId,
			maxAvailable: { $gte: size},
			minAvailable: { $lte: size }})
		.populate('reservation')
	})
	.then(function(tables){
		console.log('in checkAvailability static, found tables: ', tables)
		if (!tables){
			console.log('no tables available for that restaurant and size')
			return null;
		}
		if (!tables.reservations) {
			console.log('tables are fully free')
			return tables[0];
		}
		var newTables = tables.filter(function(table){
			var tableBooked;
			table.reservations.forEach(function(reservation){
				if (reservation.beg === qbeg || reservation.end === qend) {
					tableBooked = true;
					console.log('in A or B');
				}
				else if (reservation.beg < qbeg && reservation.end > qbeg) {
					tableBooked = true;
					console.log('in C');
				}
				else if (reservation.beg > qbeg && reservation.beg < qend) {
					tableBooked = true;
					console.log('in D');
				}
			})
		console.log('table Booked? ', tableBooked)
		return !tableBooked;
	});
	if (newTables.length > 0) return newTables[0];
	else return null;
	})
}


mongoose.model('Reservation', schema);
