(function () {

    var app = angular.module('newsPortalApp');


    app.directive('deleteNewsModalDir', ['$http', '$location', '$timeout', 'CONTENT_API',
        function ($http, $location, $timeout, CONTENT_API) {

            return {
                restrict: 'E',
                scope: {
                    newsid: "<",
                    type:   "<",
                    title:  "@"
                },
                templateUrl: '/app/templates/news/deleteNewsModal.htm',
                link: function (scope) {

                    scope.$on('showDeleteModal', function () {
                        $("#deleteNewsModal").modal('show');
                    });

                    scope.cancelDelete = function() {
                        $("#deleteNewsModal").modal('hide');
                    };

                    scope.deleteNews = function() {
                        console.log(scope.newsid);
                        console.log(scope.type);
                        $("#deleteNewsModal").modal('hide');
                        $http.delete(CONTENT_API.NEWS + scope.newsid);
                        $timeout(function() {
                            $location.path('/news/' + scope.type);
                        }, 200);
                    };
                }
            };

        }
    ]);

}());
