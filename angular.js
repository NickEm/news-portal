var newsPortalApp = angular.module('newsPortalApp', []);

newsPortalApp.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider
            .when('news/nature', {
                templateUrl: 'news/nature',
                controller: 'listOfNewsController'})
            .when('news/science', {
                templateUrl: 'news/science',
                controller: 'ShowOrdersController'})
            .when('news/science', {
                templateUrl: 'news/science',
                controller: 'ShowOrdersController'})
            .otherwise({
                redirectTo: 'news/nature'
        });
    }
]);


sampleApp.controller('particularNewsController', function($scope, $routeParams) {

    $scope.order_id = $routeParams.orderId;

});

newsPortalApp.controller('listOfNewsController', function ($scope, newsService) {
    $scope.listOfNews = [];
    newsService.getListOfNews().then(function(data) { $scope.listOfNews = data });

});

newsPortalApp.service('newsService', function ($http, $q){
    var service = {};
    service.getListOfNews = function(){
        var defer = $q.defer();
        $http.get("http://private-a5cdd5-newsportal.apiary-mock.com/news/nature")
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
    return service;
});
