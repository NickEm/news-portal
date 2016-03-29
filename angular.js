var newsPortalApp = angular.module('newsPortalApp', []);
newsPortalApp.controller('newsController', function ($scope, newsService) {

    $scope.listOfNews = [];
    newsService.getListOfNews().then(function(data) { $scope.listOfNews = data });

});

newsPortalApp.service('newsService', function ($http, $q){
    var service = {};
    service.getListOfNews = function(){
        var defer = $q.defer();
        $http.get("http://private-a5cdd5-newsportal.apiary-mock.com/news/nature")
            .then(
                function(response){
                    console.log('News are loaded successfully.');
                    defer.resolve(response.data);
                },
                function(response){
                    console.log('Error during loading news.');
                    defer.reject();
                }
            );
        return defer.promise;
    };
    return service;
});
