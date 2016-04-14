describe('List of news ', function() {
    var scope, $httpBackend, listOfNewsController;

    beforeEach(module('newsPortalApp'));

    //beforeEach(inject(function ($rootScope, _$httpBackend_, $controller, $routeParams, newsService) {
    //    $httpBackend = _$httpBackend_;
    //    scope = $rootScope.$new();
    //
    //    listOfNewsController = function() {
    //        return $controller('listOfNewsController', {
    //            '$scope': scope
    //        });
    //    };
    //}));

    it('initial test', function () {
        expect(true).toBe(true);
    });

});

describe("Testing a newsService", function () {
    var httpBackend, CONTENT_API, newsService;

    beforeEach(module('ngRoute'));
    beforeEach(module('ngAnimate'));
    beforeEach(module('ui.bootstrap'));
    beforeEach(module('ngStorage'));
    beforeEach(module('newsPortalApp'));

    beforeEach(inject(function ($injector) {
        httpBackend = $injector.get('$httpBackend');
        CONTENT_API = $injector.get('CONTENT_API');
        newsService = $injector.get('newsService');

        httpBackend.when('GET', "/news/nature").respond(200,
            [
                {"title": "Just mock news 1"},
                {"title": "Just mock news 1"},
                {"title": "Just mock news 1"}
            ]
        );

        httpBackend.when('GET', "app/templates/news/listOfNews.htm").respond(200, {});

    }));

    afterEach(function () {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

    it("should fetch news", function () {

        httpBackend.expectGET("/news/nature");
        httpBackend.expectGET("app/templates/news/listOfNews.htm");

        var news;
        newsService.getNews('nature').then(function(response) {
            news = response.data;
        });

        httpBackend.flush();

        expect(news.length).toBe(3);
    });

});