var newsPortalApp = angular.module('newsPortalApp', ['ngRoute', 'ngAnimate', 'ui.bootstrap']);

newsPortalApp.config(
    function ($routeProvider) {
        $routeProvider
            .when('/news/:type/:newsId', {
                templateUrl: 'templates/news/detailsNews.htm',
                controller: 'detailsNewsController'
            })
            .when('/news/:type', {
                templateUrl: 'templates/news/listOfNews.htm',
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