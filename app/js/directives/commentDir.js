(function () {

    var app = angular.module('newsPortalApp');

    app.directive('commentDir', ['httpGetFactory', function (httpGetFactory) {

        return {
            restrict: 'A',
            scope: {},
            templateUrl: '/app/templates/news/comments.htm',
            link: function (scope) {
                httpGetFactory.execute('http://private-a5cdd5-newsportal.apiary-mock.com/news/nature/1/comments').then(function (data) {
                    scope.comments = data;
                });
            }
        };

    }]);
}());
