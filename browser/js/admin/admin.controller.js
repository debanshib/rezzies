app.controller('AdminController', function ($scope, ReservationFactory, restaurants) {
	$scope.restaurants = restaurants;

	ReservationFactory.getTables()
	.then(function(tables){
		$scope.tables = tables;
	})

	$scope.createRestaurant = ReservationFactory.createRestaurant(restaurant)

	$scope.restaurantReservations = ReservationFactory.getRestaurantReservations()

});