var newsPortalApp = angular.module('newsPortalApp', ['ngRoute', 'ngAnimate', 'ui.bootstrap']);

newsPortalApp.config(
    function ($routeProvider) {
        $routeProvider
            .when('/news/:type/:newsId', {
                templateUrl: 'templates/detailsNews.htm',
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

newsPortalApp.constant("CONTENT_API", {
    "NEWS": "http://private-a5cdd5-newsportal.apiary-mock.com/news/"
});

//Strict Contextual Escaping - to result in a value that is marked as safe to use for that context.
newsPortalApp.filter("trustUrl", function ($sce) {
    return function (sourceUrl) {
        return $sce.trustAsResourceUrl(sourceUrl);
    };
});

//Get tooltips to work
newsPortalApp.directive('tooltip', function(){
    return {
        restrict: 'A',
        link: function(scope, element, attrs){
            $(element).hover(function(){
                $(element).tooltip('show');
            }, function(){
                $(element).tooltip('hide');
            });
        }
    };
});

newsPortalApp.controller('detailsNewsController', function($scope, $routeParams, newsService) {
    $scope.news = {};

    newsService.getNews($routeParams.type, $routeParams.newsId).then(
        function (data) {
            $scope.news = data;
        }, function (data) {
            $scope.news = data;
        });
});

newsPortalApp.controller('listOfNewsController', function ($scope, $routeParams, newsService) {
    $scope.listOfNews = [];

    newsService.getNews($routeParams.type).then(
        function (data) {
            $scope.listOfNews = data;
        }, function (data) {
            $scope.listOfNews = data;
        });
});

newsPortalApp.service('newsService', function ($http, $q, CONTENT_API) {
    var service = {};
    service.getNews = function (newsType, newsId) {
        if (newsType) {
            if (newsId) {
                return makeHttpCallForNews($http, $q, CONTENT_API.NEWS + newsType + "/" + newsId);
            } else {
                return makeHttpCallForNews($http, $q, CONTENT_API.NEWS + newsType);
            }
        } else {
            //TODO also we could implement error message
            var deferResult = $q.defer();
            deferResult.reject();
            return deferResult.promise;
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
