'use strict';
var router = require('express').Router();
var mongoose = require('mongoose');
var Table = mongoose.model('Table');
var Promise = require('bluebird');
module.exports = router;
var _ = require('lodash');

router.get('/', function(req, res, next){
	Table.find({})
	.then(function(tables){
		res.status(200).send(tables);
	})
})

//create new table for a restaurant
router.post('/', function(req, res, next){
	Table.create({
		minAvailable: req.body.minAvailable, 
		maxAvailable: req.body.maxAvailable, 
		restaurant: req.body.restaurantId
	})
	.then(function(newTable){
		console.log('created new Table', newTable)
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

