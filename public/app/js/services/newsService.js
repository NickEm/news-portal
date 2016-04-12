(function () {

    var app = angular.module('newsPortalApp');

    //Refactor with incorrect news
    app.service('newsService', ['httpGetFactory', 'CONTENT_API', function (httpGetFactory, CONTENT_API) {
        var service = {};
        service.getNews = function (newsType, newsId) {
            if (newsType) {
                if (newsId) {
                    return httpGetFactory.execute(CONTENT_API.NEWS + newsType + "/" + newsId);
                } else {
                    return httpGetFactory.execute(CONTENT_API.NEWS + newsType);
                }
            }
        };
        return service;

    }]);

}());

