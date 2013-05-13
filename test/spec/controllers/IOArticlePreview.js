'use strict';

describe('Controller: IOArticlePreviewCtrl', function () {
  var IOArticlePreviewCtrl, scope, location, FeedManager;

  beforeEach(module('ngswipeDemoApp'));

  beforeEach(inject(function ($controller, $rootScope, $injector, $location, ArticlesMock) {
    scope = $rootScope.$new();
    FeedManager = $injector.get('FeedManager');
    IOArticlePreviewCtrl = $controller('IOArticlePreviewCtrl', {
      $scope: scope,
      Articles: ArticlesMock
    });

    location = $location;

    scope.activeFeed = 'DailyJS';

    scope.loadArticles(scope.activeFeed);

    scope.$digest();
  }));

  describe('Article Loading', function () {
    it('should load articles from a service to display to the user', function () {
      expect(scope.feed.entries.length).toBeGreaterThan(0);
    });

    it('should put the articles in a list on the scope after calling bootstrapArticles()', function () {
      scope.articles = [];
      scope.bootstrap();
      scope.$digest();

      expect(scope.feed.entries.length).toBeGreaterThan(0);
    });

    it('should clear the articles from the scope when loading new articles', function () {
      scope.loadArticles('Foobar');
      scope.$digest();

      expect(scope.feed.entries).toBeUndefined();
    });

    it('should load new articles when loadArticles method is called', function () {
      scope.loading = false;
      scope.loadArticles();
      expect(scope.loading).toBe(true);
    });

    it('should change the route to show an article detail when calling showArticle', function () {
      scope.openArticle('http://hello-article');
      expect(location.url()).toContain('hello-article');
    });
  });
});
