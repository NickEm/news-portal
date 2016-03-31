newsPortalApp.controller('listOfNewsController', function ($scope, $routeParams, newsService) {
    $scope.listOfNews = [];

    newsService.getNews($routeParams.type).then(
        function (data) {
            $scope.listOfNews = data;
        }, function (data) {
            $scope.listOfNews = data;
        });
});
