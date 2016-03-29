var newsPortalApp = angular.module('newsPortalApp', ['ngRoute']);

newsPortalApp.config(
    function ($routeProvider) {
        $routeProvider
            .when('/news/nature/:newsId', {
                templateUrl: 'templates/listOfNews.htm',
                controller: 'particularNewsController'
            })
            .when('/news/science', {
                templateUrl: 'templates/listOfNews.htm',
                controller: 'listOfScienceNewsController'
            })
            .when('/news/nature', {
                templateUrl: 'templates/listOfNews.htm',
                controller: 'listOfNatureNewsController'
            })
            .otherwise({
                redirectTo: '/'
            });
    }
);

newsPortalApp.controller('particularNewsController', function($scope, $routeParams) {
    debugger;
    $scope.order_id = $routeParams.newsId;
});

/*newsPortalApp.controller('listOfNewsController', function ($scope, $routeParams, natureNewsService, scienceNewsService) {
    debugger;
    $scope.listOfNews = [];
    $scope.$on('$routeChangeSuccess', function() {
        debugger;
        switch($routeParams.type) {
            case 'nature':
                natureNewsService.getListOfNews().then(function(data) { $scope.listOfNews = data });
                break;
            case 'science':
                scienceNewsService.getListOfNews().then(function(data) { $scope.listOfNews = data });
                break;
        }
    });
});*/

newsPortalApp.controller('listOfScienceNewsController', function ($scope, $routeParams, scienceNewsService) {
    debugger;
    $scope.listOfNews = [];
    scienceNewsService.getListOfNews().then(function (data) {
        $scope.listOfNews = data;
    });
});

newsPortalApp.controller('listOfNatureNewsController', function ($scope, $routeParams, natureNewsService) {
    debugger;
    $scope.listOfNews = [];
    natureNewsService.getListOfNews().then(function (data) {
        $scope.listOfNews = data;
    });
});

newsPortalApp.service('natureNewsService', function ($http, $q){
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

newsPortalApp.service('scienceNewsService', function ($http, $q){
    var service = {};
    service.getListOfNews = function(){
        var defer = $q.defer();
        $http.get("http://private-a5cdd5-newsportal.apiary-mock.com/news/science")
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
