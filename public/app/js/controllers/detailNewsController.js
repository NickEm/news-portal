(function () {

    var app = angular.module('newsPortalApp');

    app.controller('detailNewsController', ['$scope', '$routeParams', '$location', '$timeout', 'newsService', '$localStorage',
        function ($scope, $routeParams, $location, $timeout, newsService, $localStorage) {

            var self = this;
            self.news = {};

            newsService.getNews($routeParams.type, $routeParams.newsId).then(
                function (data) {
                    self.news = data;
                }, function (data) {
                    self.news = data;
                });

            self.openComments = function (state) {
                if (!state) {
                    $scope.$broadcast('openComments', self.news.type,  self.news.news_id);
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
