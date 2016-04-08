(function () {

    var app = angular.module('newsPortalApp');


    app.directive('deleteNewsModalDir', ['httpGetFactory', '$location', '$timeout',
        function (httpGetFactory, $location, $timeout) {

            return {
                restrict: 'E',
                scope: {
                    newsId:             "<",
                    type:               "<",
                    title:              "@"
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
                        //TODO: Send request to backend to delete news using news_id.
                        $("#deleteNewsModal").modal('hide');
                        $timeout(function() {
                            $location.path('/news/' + scope.type);
                        }, 200);
                    };
                }
            };

        }
    ]);

}());
