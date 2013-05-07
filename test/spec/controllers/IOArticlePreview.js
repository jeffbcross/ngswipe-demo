'use strict';

describe('Controller: IOArticlePreviewCtrl', function () {

  // load the controller's module
  beforeEach(module('ngswipeDemoApp'));

  var IOArticlePreviewCtrl, scope, location, articles;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $injector, $location) {
    $httpBackend = $injector.get('$httpBackend');

    scope = $rootScope.$new();
    IOArticlePreviewCtrl = $controller('IOArticlePreviewCtrl', {
      $scope: scope,
      $httpBackend: $httpBackend,
      articles: articlesMock
    });

    location = $location;

    scope.activeFeed = 'DailyJS';

    scope.loadArticles(scope.activeFeed).then(function (data) {
      articles = data.data.query.results.entry;
    });

    scope.$digest();
  }));

  describe('Article Loading', function () {
    it('should load articles from a service to display to the user', function () {
      expect(articles.length).toBeGreaterThan(0);
    });

    it('should put the articles in a list on the scope after calling bootstrapArticles()', function () {
      scope.articles = [];
      scope.bootstrapArticles();

      expect(scope.articles.length).toBeGreaterThan(0);
    });

    it('should clear the articles from the scope when loading new articles', function () {
      scope.loadArticles('Foobar');
      expect(scope.articles.length).toBe(0);
    });

    it('should load new articles when the activeFeed property changes', function () {
      scope.activeFeed = "AngularJS";
      
      scope.$digest();

      expect(scope.articles[0].title).toEqual('Angular');
    });

    it('should load new articles when reloadArticles method is called', function () {
      scope.loading = false;
      scope.reloadArticles();
      expect(scope.loading).toBe(true);
    });

    it('should change the route to show an article detail when calling showArticle', function () {
      scope.showArticle('http://hello-article');
      expect(location.url()).toContain('hello-article');
    });

    it('should update the scope with an error message when articles cannot be loaded', function () {
      expect(false).toBe(true);
    });
  });
});
