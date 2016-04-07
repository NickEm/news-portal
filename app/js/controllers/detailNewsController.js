(function () {

    var app = angular.module('newsPortalApp');

    app.controller('detailNewsController', ['$scope', '$routeParams', '$location', '$timeout', 'newsService',
        function ($scope, $routeParams, $location, $timeout, newsService) {

            var self = this;
            self.news = {};
            self.showEditModal = false;
            self.showDeleteModal = false;
            self.shelveNews = {};

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

            self.toggleDeleteModal = function(){
                self.showDeleteModal = true;
                $("#deleteNewsModal").modal('show');
            };

            self.cancelDelete = function(news) {
                $("#deleteNewsModal").modal('hide');
                self.showDeleteModal = false;
            };

            self.deleteNews = function(news) {
                //TODO: Send request to backend to delete news using news_id.
                self.showDeleteModal = false;
                $("#deleteNewsModal").modal('hide');
                $timeout(function() {
                    $location.path('/news/' + news.type);
                }, 200);
            };

            $("#deleteNewsModal").on('hidden.bs.modal', function(){
                self.showDeleteModal = false;
            });


            self.toggleEditModal = function(){
                self.showEditModal = true;
                angular.copy(self.news, self.shelveNews);
                $("#editNewsModal").modal('show');
            };

            self.cancelEdit = function() {
                angular.copy(self.news, self.shelveNews);
                $("#editNewsModal").modal('hide');
            };

            self.editNews = function(news) {
                angular.copy(self.shelveNews, self.news);
                $("#editNewsModal").modal('hide');
            };

            $("#editNewsModal").on('hidden.bs.modal', function(){
                self.showEditModal = false;
            });

    }]);

}());
