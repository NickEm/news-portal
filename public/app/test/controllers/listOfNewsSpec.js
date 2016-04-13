describe('List of news ', function() {
    var scope, $httpBackend, listOfNewsController;

    beforeEach(module('newsPortalApp'));

    beforeEach(inject(function ($rootScope, _$httpBackend_, $controller, $routeParams, newsService) {
        $httpBackend = _$httpBackend_;
        scope = $rootScope.$new();

        listOfNewsController = function() {
            return $controller('listOfNewsController', {
                '$scope': scope
            });
        };
    }));

/*    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });*/

    it('initial test', function () {
        expect(true).toBe(true);
    });

/*    it('should make call for list of news', inject(function(newsService) {
        var controller = listOfNewsController();

        $httpBackend.expectGET('/news/nature').respond(200, [
            { title: "Bla1"}, {title: "Bla2"}
        ]);

        var result = newsService.getNews('nature');

        expect(result.length).toBe(0);

    }));*/

});