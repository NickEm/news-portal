(function () {

    var app = angular.module('newsPortalApp');

    app.controller('listOfNewsController', ['$routeParams', 'newsService', function ($routeParams, newsService) {
        var self = this;
        self.listOfNews = [];

        newsService.getNews($routeParams.type).then(
            function (data) {
                self.listOfNews = data;
            }, function (data) {
                self.listOfNews = data;
            });

    }]);

}());
