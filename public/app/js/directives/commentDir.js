(function () {

    var app = angular.module('newsPortalApp');

    app.directive('commentDir', ['$http', '$localStorage', 'CONTENT_API', function ($http, $localStorage, CONTENT_API) {

        return {
            restrict: 'A',
            scope: {},
            templateUrl: '/app/templates/news/comments.htm',
            link: function (scope) {

                scope.addComment = function(description) {
                    scope.comments.push({
                        description: description,
                        author: scope.user.name,
                        created_date: new Date()
                    });

                    scope.description = "";
                };

                scope.$on('openComments', function (event, newsId) {
                    scope.user = $localStorage.authenticatedUser;
                    $http.get(CONTENT_API.NEWS + newsId + "/comments")
                        .then(function (response) {
                            scope.comments = response.data;
                        });
                });
            }
        };

    }]);

}());
