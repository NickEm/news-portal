(function () {

    var newsPortalApp = angular.module('newsPortalApp', ['ngRoute', 'ngAnimate', 'ui.bootstrap', 'ngStorage']);

    newsPortalApp.config(
        function ($routeProvider) {
            $routeProvider
                .when('/news/:type/:newsId', {
                    templateUrl: 'app/templates/news/detailsNews.htm',
                    controller: 'detailNewsController as detailNewsCtrl'
                })
                .when('/news/:type', {
                    templateUrl: 'app/templates/news/listOfNews.htm',
                    controller: 'listOfNewsController as listOfNewsCtrl'
                })
                .otherwise({
                    redirectTo: '/news/nature'
                });
        }
    );

    newsPortalApp.constant("CONTENT_API", {
        /*"NEWS": "http://private-a5cdd5-newsportal.apiary-mock.com/news"*/
        "NEWS": "/news/"
    });

}());
