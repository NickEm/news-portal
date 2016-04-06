(function () {

    var app = angular.module('newsPortalApp');

    app.controller('detailNewsController', ['$scope', '$routeParams', 'newsService', function ($scope, $routeParams, newsService) {
        var self = this;
        self.news = {};
        self.showEditModal = false;

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
            console.log('Clicked edit button');
            self.showEditModal = !self.showEditModal;
        };


    }]);

}());
