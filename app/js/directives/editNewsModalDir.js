(function () {

    var app = angular.module('newsPortalApp');

    app.directive('editNewsModalDir', function () {

        return {
            restrict:       'A',
            templateUrl:    '/app/templates/news/editNewsModal.htm',
            transclude:     true,
            replace:        true,
            scope:          true,
            link: function (scope, element, attrs) {
                console.log('Smth in link of edit dir');
                scope.title = attrs.title;

                scope.$watch(attrs.visible, function(value){
                    if(value == true)
                        $(element).modal('show');
                    else
                        $(element).modal('hide');
                });

                $(element).on('shown.bs.modal', function(){
                    scope.$apply(function(){
                        scope.$parent[attrs.visible] = true;
                    });
                });

                $(element).on('hidden.bs.modal', function(){
                    scope.$apply(function(){
                        scope.$parent[attrs.visible] = false;
                    });
                });
            }
        };

    });

}());
