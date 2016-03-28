var newsPortalApp = angular.module('newsPortalApp', []);
newsPortalApp.controller('NewsController', function ($scope, datfactory) {

    $scope.listOfNews = [];
    datfactory.getlist().then(function(data) { $scope.listOfNews = data });

/*    $http.get("http://private-a5cdd5-newsportal.apiary-mock.com/news/nature")
        .then(
            function(response){
                $scope.listOfNews = response;
            },
            function(response){
                // failure call back
            }
        );*/
});

newsPortalApp.factory('datfactory', function ($http, $q){
    var factory = {};
    factory.getlist = function(){
        var defer = $q.defer();
        $http.get("http://private-a5cdd5-newsportal.apiary-mock.com/news/nature")
            .then(
                function(response){
                    debugger;
                    defer.resolve(response.data);
                },
                function(response){
                    defer.reject();
                }
            );
        return defer.promise;
    };
    return factory;
});
