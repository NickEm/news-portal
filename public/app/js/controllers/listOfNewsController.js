(function () {

    var app = angular.module('newsPortalApp');

    app.controller('listOfNewsController', ['$routeParams', 'newsService', function ($routeParams, newsService) {
        var self = this;
        self.listOfNews = [];

        newsService.getNews($routeParams.type).then(
            function (response) {
                if(!jQuery.isEmptyObject(response.data)) {
                    self.listOfNews = response.data;
                } else {
                    self.listOfNews = null;
                }
            }, function (response) {
                /*TODO: Show some error message*/
            });

    }]);

}());
