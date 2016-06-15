app.controller('AdminController', function ($scope, SecretStash, ReservationFactory, restaurants){
	console.log('in admin controller')
	SecretStash.getStash().then(function (stash) {
        $scope.stash = stash;
    });

    $scope.restaurants = restaurants;
    console.log($scope.restaurants);

    $scope.submit = function(){
	    if ($scope.rezzie){
		    ReservationFactory.getTables($scope.rezzie.restaurantSelect)
		    	.then(function(tables){
		    		$scope.tables = tables;
		    	})
	    }
    }
})