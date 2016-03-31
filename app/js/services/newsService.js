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
            deferResult.reject(responce);
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