app.controller('ReservationController', function ($scope, ReservationFactory, restaurants){
	$scope.restaurants = restaurants;

	// $scope.month = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sept','Oct','Nov','Dec'];
	// $scope.day = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];
	// $scope.hours = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
	// $scope.minutes = [00, 15, 30, 60];
	// $scope.AMPM = ['AM', 'PM']
	$scope.months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sept','Oct','Nov','Dec'];
	$scope.size;
	$scope.date;
	$scope.hrs;
	$scope.minutes;
	$scope.restaurantId;
	$scope.email;
	$scope.reservation;

	var rezzie;
	$scope.submit = function(){
		if ($scope.rezzie) {
			rezzie = $scope.rezzie;
			var date = new Date(2016, $scope.months.indexOf(rezzie.monthSelect), rezzie.daySelect);
			var hours = Number(rezzie.hourSelect);
			if (rezzie.AMPMSelect === "PM" && hours<12) hours+=12;
			if (rezzie.AMPMSelect === "AM" && hours===12) hours-=12;
			date.setHours(hours);
			date.setMinutes(Number(rezzie.minSelect));
			$scope.reservation = {date: date, size: rezzie.guestSelect, restaurantId: rezzie.restaurantSelect}
			console.log('reservation data', $scope.reservation);
			
			return ReservationFactory.createReservation($scope.reservation)
			.then(function(result){
				if (result === false) console.log('no tables are available');
				else console.log('reservation has been made');
				console.log('result', result)
			})
		}
	}


	// ReservationFactory.createReservation($scope.reservation)
	// .then(function(result){
	// 	console.log('result', result)
	// })

});