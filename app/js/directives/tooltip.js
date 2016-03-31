newsPortalApp.directive('tooltip', function(){
    return {
        restrict: 'A',
        link: function(scope, element){
            $(element).hover(function(){
                $(element).tooltip('show');
            }, function(){
                $(element).tooltip('hide');
            });
        }
    };
});
