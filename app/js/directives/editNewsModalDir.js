(function () {

    var app = angular.module('newsPortalApp');

    app.directive('editNewsModalDir', function () {

        return {
            restrict:       'E',
            templateUrl:    '/app/templates/news/editNewsModal.htm',
            transclude:     true,
            replace:        true,
            //scope:          true,
            scope: {
                news:       "=",
                visible:    "="
            },
            link: function (scope, element) {
                debugger;
                console.log('Smth in link of edit dir');
                console.log("Visible: " + scope.visible);
                scope.visible = true;

                scope.$watch(scope.visible, function(value){
                    console.log('Inside watcher');
                    if(value == true)
                        $(element).modal('show');
                    else
                        $(element).modal('hide');
                });

                $(element).on('shown.bs.modal', function(){
                    console.log('On modal show');
                    scope.$apply(function(){
                        scope.visible = true;
                    });
                });

                $(element).on('hidden.bs.modal', function(){
                    console.log('On modal hide');
                    scope.$apply(function(){
                        scope.visible = false;
                    });
                });
            }
        };

    });

}());
