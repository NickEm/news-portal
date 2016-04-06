(function () {

    var app = angular.module('newsPortalApp');

    app.controller('detailNewsController', ['$scope', '$routeParams', 'newsService', function ($scope, $routeParams, newsService) {
        var self = this;
        self.news = {};
        self.showEditModal = false;
        self.shelveNews = {};

        newsService.getNews($routeParams.type, $routeParams.newsId).then(
            function (data) {
                self.news = data;
            }, function (data) {
                self.news = data;
            });

        self.openComments = function (state) {
            if (!state) {
                $scope.$broadcast('openComments');
            }
        };

        self.toggleEditModal = function(){
            self.showEditModal = !self.showEditModal;
            if (self.showEditModal == true) {
                angular.copy(self.news, self.shelveNews);
                $("#editNewsModal").modal('show');

            } else {
                $("#editNewsModal").modal('hide');
            }
            self.showEditModal = !self.showEditModal;
        };

        self.resetNews = function() {
            console.log("Reset");
            angular.copy(self.news, self.shelveNews);
            $("#editNewsModal").modal('hide');
        };

        self.updateNews = function(news) {
            console.log("Updated title:" + news.title);
            angular.copy(self.shelveNews, self.news);
            $("#editNewsModal").modal('hide');
        };

        //$(element).on('shown.bs.modal', function(){
        //    console.log('On modal show');
        //    scope.visible = true;
        //});
        //
        //$(element).on('hidden.bs.modal', function(){
        //    console.log('On modal hide');
        //    scope.visible = false;
        //});

    }]);

}());
