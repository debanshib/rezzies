// reservation.factory.js

app.factory('ReservationFactory', function ($http) {

	var ReservationFactory = {};

	ReservationFactory.getRestaurants = function(){
		console.log('in reservation factory - get restaurants')
		return $http.get('api/restaurant')
		.then(function(restaurants){
			console.log('restaurants in factory', restaurants.data)
			return restaurants.data;
		})
	};

	// ReservationFactory.createRestaurant = function(restaurant){
	// 	return $http.post('api/restaurant', restaurant)
	// 	.then(function(newRestaurant){
	// 		console.log('in factory: new restaurant', newRestaurant.data);
	// 		return newRestaurant.data;
	// 	})
	// };

	// ReservationFactory.updateRestaurant = function(restaurant){
	// 	return $http.put('api/restaurant', restaurant)
	// 	.then(function(updatedRestaurant){
	// 		console.log('in factory: updated restaurant: ', updatedRestaurant)
	// 		return updatedRestaurant.data;
	// 	})
	// };

	// ReservationFactory.deleteRestaurant = function(restaurantId){
	// 	return $http.delete('api/restaurant/' + restaurantId)
	// 	.then(function(){
	// 		console.log('in factory: deleted restaurant')
	// 	})
	// };

	ReservationFactory.getTables = function(restaurantId){
		console.log('in reservation factory: get Tables')
		return $http.get('api/restaurant/' + restaurantId + '/table')
		.then(function(tables){
			console.log('tables in factory', tables.data)
			return tables.data;
		})
	};

	// ReservationFactory.createTable = function(table){
	// 	return $http.post('api/table/', table)
	// 	.then(function(newTable){
	// 		console.log('in factory: new table', newTable.data)
	// 		return newTable.data;
	// 	})
	// };

	// ReservationFactory.updateTable = function(table){
	// 	return $http.put('api/table/' + tableId, table)
	// 	.then(function(updatedTable){
	// 		console.log('in factory: updated table', updatedTable)
	// 		return updatedTable.data
	// 	})
	// };

	// ReservationFactory.deleteTable = function(tableId){
	// 	return $http.delete('api/table/' + tableId)
	// 	.then(function(){
	// 		console.log('in factory: deleted table')
	// 	})
	// };


	// ReservationFactory.getRestaurantReservations = function(restaurantId){
	// 	return $http.get('/api/reservation', {restaurantId: restaurantId})
	// 	.then(function(reservations){
	// 		console.log('in factory: reservations for a given restaurant', reservations.data)
	// 		return reservations.data;
	// 	})
	// };

	// ReservationFactory.getOneReservation = function(reservationId){
	// 	return $http.get('/api/reservation/' + reservationId)
	// 	.then(function(reservation){
	// 		console.log('in factory: one reservation given a reservtaion id', reservation.data)
	// 		return reservation.data;
	// 	})
	// };

	ReservationFactory.createReservation = function(reservation){
		console.log('in create reservation factory with reservation data: ', reservation)
		return $http.post('/api/reservation/', reservation)
		.then(function(newReservation){
			console.log('new reservation', newReservation);
			return newReservation.data;
		})
	};

	// ReservationFactory.deleteReservation = function(reservationId){
	// 	return $http.get('/api/reservation/' + reservationId)
	// 	.then(function(){
	// 		console.log('reservation deleted');
	// 	})

	// };

	return ReservationFactory;
})