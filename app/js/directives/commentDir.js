(function () {

    var app = angular.module('newsPortalApp');

    app.directive('commentDir', ['httpGetFactory', 'CONTENT_API', function (httpGetFactory, CONTENT_API) {

        return {
            restrict: 'A',
            scope: {},
            templateUrl: '/app/templates/news/comments.htm',
            link: function (scope) {

                scope.addComment = function() {
                    scope.comments.push({
                        description: scope.commentDescription,
                        author: "Chris Brown",
                        created_date: new Date()
                    });

                    scope.commentDescription = "";
                };

                scope.$on('openComments', function (event, newsType, newsId) {
                    httpGetFactory.execute(CONTENT_API.NEWS + "/" + newsType + "/" + newsId + "/comments")
                        .then(function (data) {
                            scope.comments = data;
                        });
                });
            }
        };

    }]);

}());
