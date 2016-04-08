(function () {

    var app = angular.module('newsPortalApp');

    app.directive('commentDir', ['httpGetFactory', '$localStorage', 'CONTENT_API', function (httpGetFactory, $localStorage, CONTENT_API) {

        return {
            restrict: 'A',
            scope: {},
            templateUrl: '/app/templates/news/comments.htm',
            link: function (scope) {

                scope.addComment = function() {
                    scope.comments.push({
                        description: scope.commentDescription,
                        author: scope.user.name,
                        created_date: new Date()
                    });

                    scope.commentDescription = "";
                };

                scope.$on('openComments', function (event, newsType, newsId) {
                    scope.user = $localStorage.authenticatedUser;
                    httpGetFactory.execute(CONTENT_API.NEWS + "/" + newsType + "/" + newsId + "/comments")
                        .then(function (data) {
                            scope.comments = data;
                        });
                });
            }
        };

    }]);

}());
