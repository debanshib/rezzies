'use strict';
var router = require('express').Router();
var mongoose = require('mongoose');
var Restaurant = mongoose.model('Restaurant');
var Table = mongoose.model('Table');
var Promise = require('bluebird');
module.exports = router;
var _ = require('lodash');

//get info about a restaurant
router.get('/:restaurantId', function(req, res, next){
	Restaurant.findById(req.params.restaurantId)
	.then(function(restaurant){
		res.status(200).send(restaurant);
	})
	.catch(next)
})

//get all restaurants
router.get('/', function(req, res, next){
	Restaurant.find({})
	.then(function(restaurants){
		res.status(200).send(restaurants);
	})
	.catch(next)
})

//create a new restaurant
router.post('/', function(req, res, next){
	Restaurant.create(req.body)
	.then(function(newRestaurant){
		res.status(201).send(newRestaurant);
	})
	.catch(next)
})

//update info for a restaurant
router.put('/:restaurantId', function(req, res, next){
	Restaurant.update({$set: req.body})
	.then(function(updatedRestaurant){
		res.status(200).send(updatedRestaurant);
	})
	.catch(next)
})


//delete a restaurant
router.delete('/:restaurantId', function(req, res, next){
	Restaurant.remove(req.params.restaurantId)
	.then(function(){
		res.status(204).end();
	})
	.catch(next)
})




