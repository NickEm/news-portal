(function () {

    var app = angular.module('newsPortalApp');

    //TODO: Think about controller as syntax.
    app.controller('newsAppController', ['$scope', '$localStorage', function ($scope, $localStorage) {
        var self = this;
        self.loggedIn = false;

        self.changeNavigation = function ($event) {
            $($event.target).parents(".dropdown").find('.cursor-pointer').html($($event.target).text() + ' <span class="caret"></span>');
        };

        self.showLoginModal = function () {
            $("#loginModal").modal('show');
        };

        self.closeLoginModal = function (user) {
            //TODO: Think how to clear that 'user' data
            $("#loginModal").modal('hide');
        };

        self.logIn = function (user) {
            $localStorage.authenticatedUser = {
                name: user.username,
                email: user.email,
                password: user.password
            };
            self.loggedIn = true;
            $("#loginModal").modal('hide');
        };

        self.logOut = function () {
            self.loggedIn = false;
            $localStorage.$reset();
        };

    }]);

}());
