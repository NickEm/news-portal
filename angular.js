var newsPortalApp = angular.module('newsPortalApp', ['ngRoute']);

newsPortalApp.config(
    function ($routeProvider) {
        $routeProvider
            .when('/news/:type/:newsId', {
                templateUrl: 'templates/listOfNews.htm',
                controller: 'detailsNewsController'
            })
            .when('/news/:type', {
                templateUrl: 'templates/listOfNews.htm',
                controller: 'listOfNewsController'
            })
            .otherwise({
                redirectTo: '/news/nature'
            });
    }
);

newsPortalApp.controller('detailsNewsController', function($scope, $routeParams) {
    $scope.newsId = $routeParams.newsId;
});

newsPortalApp.controller('listOfNewsController', function ($scope, $routeParams, newsService) {
    $scope.listOfNews = [];

    newsService.getListOfNews($routeParams.type, $routeParams.newsId).then(
        function (data) {
            $scope.listOfNews = data;
        }, function (data) {
            $scope.listOfNews = data;
        });
});

newsPortalApp.service('newsService', function ($http, $q){
    var service = {};
    service.getListOfNews = function(newsType){
        switch (newsType) {
            case 'nature':
                if()
                return makeHttpCallForNews($http, $q, "http://private-a5cdd5-newsportal.apiary-mock.com/news/nature");
            case 'science':
                return makeHttpCallForNews($http, $q, "http://private-a5cdd5-newsportal.apiary-mock.com/news/science");
            case 'economic':
                return makeHttpCallForNews($http, $q, "http://private-a5cdd5-newsportal.apiary-mock.com/news/economic");
            case 'politic':
                return makeHttpCallForNews($http, $q, "http://private-a5cdd5-newsportal.apiary-mock.com/news/politic");
            case 'charity':
                return makeHttpCallForNews($http, $q, "http://private-a5cdd5-newsportal.apiary-mock.com/news/charity");
            default : {
                //TODO also we could implement error message
                var deferResult = $q.defer();
                deferResult.reject();
                return deferResult.promise;
            }
        }
    };
    return service;
});

var makeHttpCallForNews = function($http, $q, url) {
    var defer = $q.defer();
    $http.get(url)
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
