(function () {

    var app = angular.module('newsPortalApp');

    app.directive('tooltipDir', function () {

        return {
            restrict: 'A',
            link: function (scope, element) {
                $(element).hover(function () {
                    $(element).tooltip('show');
                }, function () {
                    $(element).tooltip('hide');
                });
            }
        };

    });

}());
