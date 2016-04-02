//Strict Contextual Escaping - to result in a value that is marked as safe to use for that context.
(function () {

    var app = angular.module('newsPortalApp');

    app.filter("trustUrl", ['$sce', function ($sce) {
        return function (sourceUrl) {
            return $sce.trustAsResourceUrl(sourceUrl);
        };
    }]);

}());
