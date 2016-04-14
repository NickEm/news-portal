(function () {

    var app = angular.module('newsPortalApp');

    app.service('newsService', ['$http', 'CONTENT_API', function ($http, CONTENT_API) {
        var service = {};
        service.getNews = function (newsType, newsId) {
            if (newsType) {
                if (newsId) {
                    return $http.get(CONTENT_API.NEWS + newsType + "/" + newsId);
                } else {
                    return $http.get(CONTENT_API.NEWS + newsType);
                }
            }
        };
        return service;

    }]);

}());

