newsPortalApp.controller('detailsNewsController', function($scope, $routeParams, newsService) {
    $scope.news = {};

    newsService.getNews($routeParams.type, $routeParams.newsId).then(
        function (data) {
            $scope.news = data;
        }, function (data) {
            $scope.news = data;
        });

});
