newsPortalApp.controller('newsAppController', function($scope) {
    $scope.changeNavigation = function($event) {
        $($event.target).parents(".dropdown").find('.cursor-pointer').html($($event.target).text() + ' <span class="caret"></span>');
    };

    $scope.deleteNews = function(newsId) {
        debugger;
    };
});
