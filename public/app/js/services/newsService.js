(function () {

    var app = angular.module('newsPortalApp');

    //Refactor with incorrect news
    app.service('newsService', ['$q', 'httpGetFactory', 'CONTENT_API', function ($q, httpGetFactory, CONTENT_API) {
        var service = {};
        service.getNews = function (newsType, newsId) {
            if (newsType) {
                if (newsId) {
                    return httpGetFactory.execute(CONTENT_API.NEWS + "/" + newsType + "/" + newsId);
                } else {
                    return httpGetFactory.execute(CONTENT_API.NEWS + "/" + newsType);
                }
            } else {
                //TODO also we could implement error message
                var deferResult = $q.defer();
                deferResult.reject();
                return deferResult.promise;
            }
        };
        return service;

    }]);

}());

