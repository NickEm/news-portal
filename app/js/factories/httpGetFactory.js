(function () {

    var app = angular.module('newsPortalApp');

    app.factory('httpGetFactory', ['$http', '$q', function ($http, $q) {
        return {
            execute: function (url) {
                var defer = $q.defer();
                $http.get(url)
                    .then(
                        function (response) {
                            defer.resolve(response.data);
                        },
                        function (response) {
                            defer.reject();
                        }
                    );
                return defer.promise;
            }
        };
    }]);

}());
