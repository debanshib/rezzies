app.config(function ($stateProvider) {
    $stateProvider.state('admin2', {
        url: '/',
        templateUrl: 'js/admin/admin.html',
        // controller: 'AdminController',
         resolve: {
            user: function(AuthService) {
                return AuthService.getLoggedInUser()
            },
            isAdminUser: function(AuthService, $state){
                AuthService.getLoggedInUser()
                .then(function(user){
                    console.log('user in admin state', user)
                    if(user.type !== 'admin') $state.go('home');
                });
            },
            restaurants: function(ReservationFactory) {
                return ReservationFactory.getRestaurants();
            }
        }
    });
});

