(function () {

    var app = angular.module('newsPortalApp');

    app.directive('commentDir', ['httpGetFactory', function (httpGetFactory) {

        return {
            restrict: 'A',
            scope: {},
            templateUrl: '/app/templates/news/comments.htm',
            link: function (scope) {

                scope.addComment = function() {
                    debugger;
                    scope.comments.push({
                        description: scope.commentDescription,
                        author: "Chris Brown",
                        created_date: new Date()
                    });

                    scope.commentDescription = "";
                };

                scope.$on('commentAreOpened', function (event, data) {
                    httpGetFactory.execute('http://private-a5cdd5-newsportal.apiary-mock.com/news/nature/1/comments')
                        .then(function (data) {
                            console.log("Comments are loaded");
                            scope.comments = data;
                        });
                });
            }
        };

    }]);

}());
