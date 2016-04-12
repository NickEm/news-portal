(function () {

    var app = angular.module('newsPortalApp');

    //TODO: This is redundant logic delete this
    app.factory('httpGetFactory', ['$http',  function ($http) {
        return {
            execute: function (url) {
                return $http.get(url);
            }
        };
    }]);

}());
