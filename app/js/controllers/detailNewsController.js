(function () {

    var app = angular.module('newsPortalApp');

    app.controller('detailNewsController', ['$scope', '$routeParams', '$location', '$timeout', 'newsService', '$localStorage',
        function ($scope, $routeParams, $location, $timeout, newsService, $localStorage) {

            var self = this;
            self.news = {};
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

            self.showDeleteModal = function(){
                console.log("In show of controller");
                $scope.$broadcast('showDeleteModal');
            };

            self.showEditModal = function(){
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

            $("#editNewsModal").on('shown.bs.modal', function () {
                if (self.news.images && self.news.images.length > 0) {

                    var initialPreviewImages = [];

                    for (var i = 0; i < self.news.images.length; i++) {
                        initialPreviewImages.push('<img src="' + self.news.images[i].image_url + '" class="file-preview-image">');
                    }

                    var imageConfig = {
                        initialPreview: initialPreviewImages,
                        overwriteInitial: false,
                        initialCaption: "Already uploaded images"
                    };
                    $("#edit_images").fileinput(imageConfig);
                }
            });

    }]);

}());
