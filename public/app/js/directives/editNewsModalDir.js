(function () {

    var app = angular.module('newsPortalApp');

    app.directive('editNewsModalDir', function () {

        return {
            restrict: 'E',
            scope: {
                news: "="
            },
            templateUrl: '/app/templates/news/editNewsModal.htm',
            link: function (scope) {

                scope.shelveNews = {};

                scope.$on('showEditModal', function () {
                    angular.copy(scope.news, scope.shelveNews);
                    $("#editNewsModal").modal('show');
                });

                scope.cancelEdit = function () {
                    angular.copy(scope.news, scope.shelveNews);
                    $("#editNewsModal").modal('hide');
                };

                scope.editNews = function (news) {
                    angular.copy(scope.shelveNews, scope.news);
                    $("#editNewsModal").modal('hide');
                };

                //Here is initializing of image preview
                $("#editNewsModal").on('shown.bs.modal', function () {
                    if (scope.shelveNews.images && scope.shelveNews.images.length > 0) {

                        var initialPreviewImages = [];

                        for (var i = 0; i < scope.shelveNews.images.length; i++) {
                            initialPreviewImages.push('<img src="' + scope.shelveNews.images[i].image_url + '" class="file-preview-image">');
                        }

                        var imageConfig = {
                            initialPreview: initialPreviewImages,
                            overwriteInitial: false,
                            initialCaption: "Already uploaded images"
                        };
                        $("#edit_images").fileinput(imageConfig);
                    }
                });

            }
        };
    });

}());
