'use strict';
var router = require('express').Router();
var mongoose = require('mongoose');
var Table = mongoose.model('Table');
var Promise = require('bluebird');
module.exports = router;
var _ = require('lodash');

//get tables for a given restaurant
router.get('/:restaurantId', function(req, res, next){
	Table.find({restaurant: req.params.restaurantId})
	.then(function(tables){
		res.status(200).send(tables);
	})
	.catch(next)
})

//create new table for a restaurant
router.post('/:restaurantId', function(req, res, next){
	// req.body.restaurant = req.params.restaurantId;
	console.log('in create table post route')
	Table.create({
		minAvailable: req.body.minAvailable, 
		maxAvailable: req.body.maxAvailable, 
		restaurant: req.params.restaurantId
	})
	.then(function(newTable){
		res.status(201).send(newTable);
	})
	.catch(next)
})

//update table info
router.put('/:tableId', function(req, res, next){
	Table.update({$set: req.body})
	.then(function(updatedTable){
		res.status(200).send(updatedTable);
	})
	.catch(next)
})

//delete table
router.delete('/:tableId', function(req, res, next){
	Table.remove(req.params.tableId)
	.then(function(){
		res.status(204).end();
	})
	.catch(next)
})

