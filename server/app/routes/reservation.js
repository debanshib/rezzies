'use strict';
var router = require('express').Router();
var mongoose = require('mongoose');
var Table = mongoose.model('Table');
var User = mongoose.model('User');
var Reservation = mongoose.model('Reservation');
var Restaurant = mongoose.model('Restaurant');
var Promise = require('bluebird');
module.exports = router;
var _ = require('lodash');


//get all reservations for ONE specific restaurant
router.get('/', function(req, res, next){
	Reservation.find({restaurant: req.body.restaurantId})
	.then(function(reservations){
		res.status(200).send(reservations)
	})
})

//get one reservation by ID
router.get('/:reservationId', function(req, res, next){
	Reservation.findById(req.params.reservationId)
	.then(function(reservation){
		res.status(200).send(reservation)
	})
})


router.post('/', function(req, res, next){
	console.log('in reservation post route with req.body', req.body);
	var size = req.body.size;
	var date = req.body.date;
	var restaurantId = req.body.restaurantId
	var email = req.body.email;
	var qbeg = new Date(date);
	var tableId, newRez, qend;
	return Restaurant.findById(restaurantId)
	.then(function(restaurant){
		var avgDuration = restaurant.avgDuration;
		var x = new Date(qbeg);
		qend = new Date(x.setMinutes(x.getMinutes() + avgDuration));
		return Reservation.checkAvailability(restaurantId, qbeg, qend, size)
	})
	.then(function(table){
		if (table === null || table === undefined) {
			newRez = false;
			res.status(200).send(newRez).end();
		}
		else {
			tableId = table._id;
			return User.findOrCreate(email)
			.then(function(user){
				return Reservation.create({
					date: date,
					user: user._id,
					size: size,
					beg: qbeg,
					end: qend,
					status: 'reserved'
				})
			})
			.then(function(newReservation){
				newRez = newReservation;
				newRez.tableAvailable = true;
				return Table.findByIdAndUpdate(tableId, {$push: {reservations: newReservation._id}})
			})
			.then(function(updatedTable){
				res.status(200).send(newRez);
			})
		}
	})
	.catch(next)
})

router.delete('/:reservationId', function(req, res, next){
	Reservation.remove(req.params.restaurantId)
	.then(function(reservation){
		Table.findByIdAndUpdate({_id: reservation.table}, {$pull: {'reservation': req.params.reservationId}})
	})
	.then(function(){
		res.status(204).end();
	})
})



