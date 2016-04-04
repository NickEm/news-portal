(function () {

    var app = angular.module('newsPortalApp');

    //TODO: Think about controller as syntax.
    app.controller('newsAppController', ['$scope', function ($scope) {
        $scope.changeNavigation = function ($event) {
            $($event.target).parents(".dropdown").find('.cursor-pointer').html($($event.target).text() + ' <span class="caret"></span>');
        };

        $scope.deleteNews = function (newsId) {
            //TODO: Here DELETE request should be send to backend and page is redirecting to list of news with the same type.
        };
    }]);

}());
