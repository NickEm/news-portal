(function () {

    var app = angular.module('newsPortalApp');

    //TODO: Think about controller as syntax.
    app.controller('newsAppController', ['$scope', function ($scope) {
        var self = this;
        self.loggedIn = false;

        self.changeNavigation = function ($event) {
            $($event.target).parents(".dropdown").find('.cursor-pointer').html($($event.target).text() + ' <span class="caret"></span>');
        };

        self.showLoginModal = function () {
            $("#loginModal").modal('show');
        };

        self.closeLoginModal = function (user) {

            console.log("Close is called ");
            console.log(user);
            self.userForm = {};
            user = {};
            $("#loginModal").modal('hide');
        };

        self.login = function (user) {
            console.log(user);
        };

    }]);

}());
