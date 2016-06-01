'use strict';
var router = require('express').Router();
var mongoose = require('mongoose');
var Table = mongoose.model('Table');
var User = mongoose.model('User');
var Reservation = mongoose.model('Reservation');
var Promise = require('bluebird');
module.exports = router;
var _ = require('lodash');


router.post('/', function(req, res, next){
	var size = req.body.size;
	var date = req.body.date;
	var restaurantId = req.body.restaurantId
	var tableId;
	var email = req.body.email;
	return Reservation.checkAvailability(restaurantId, date, size)
	.then(function(table){
		console.log('table availability', table)
		if (table === null || table === undefined) {
			console.log('in route, table is null or undefined:', table)
			res.status(404).send("Table not found").end();
		}
		else {
			tableId = table._id;
			return User.findOrCreate(email)
			.then(function(user){
				console.log('in post route, found or created new user', user)
				return Reservation.create({
					date: date,
					user: user._id,
					size: size,
					table: tableId, 
					status: 'reserved'
				})
			})
			.then(function(newReservation){
				console.log('in post route, here is the new rezzie', newReservation)
				res.status(200).send(newReservation);
			})
		}
	})
	.catch(next)
})

// router.get('/:reservationId', function(req, res, next){

// })
