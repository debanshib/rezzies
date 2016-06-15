app.config(function ($stateProvider) {
    $stateProvider.state('reservation', {
        url: '/reservation',
        templateUrl: 'js/reservations/reservation.html',
        controller: 'ReservationController',
        resolve: {
            user: function(AuthService) {
                return AuthService.getLoggedInUser();
            },
            restaurants: function(ReservationFactory) {
                return ReservationFactory.getRestaurants();
            }
        }
    });
});

