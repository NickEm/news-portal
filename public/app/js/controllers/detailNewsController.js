(function () {

    var app = angular.module('newsPortalApp');

    app.controller('detailNewsController', ['$scope', '$routeParams', '$location', '$timeout', 'newsService',
        function ($scope, $routeParams, $location, $timeout, newsService) {

            var self = this;
            self.news = {};

            newsService.getNews($routeParams.type, $routeParams.newsId).then(
                function (response) {
                    if(!jQuery.isEmptyObject(response.data)) {
                        self.news = response.data[0];
                    } else {
                        self.news = null;
                    }
                }, function (response) {
                    //TODO: Show some error message
                });

            self.openComments = function (state) {
                if (!state) {
                    $scope.$broadcast('openComments', self.news._id);
                }
            };

            self.showDeleteModal = function(){
                $scope.$broadcast('showDeleteModal');
            };

            self.showEditModal = function(){
                $scope.$broadcast('showEditModal');
            };

    }]);

}());
