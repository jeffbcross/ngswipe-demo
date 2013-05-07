'use strict';

describe('Controller: IOArticlePreviewCtrl', function () {
  var IOArticlePreviewCtrl, scope, location;

  beforeEach(module('ngswipeDemoApp'));

  beforeEach(inject(function ($controller, $rootScope, $injector, $location, ArticlesMock) {
    scope = $rootScope.$new();
    IOArticlePreviewCtrl = $controller('IOArticlePreviewCtrl', {
      $scope: scope,
      Articles: ArticlesMock
    });

    location = $location;

    scope.activeFeed = 'DailyJS';

    scope.loadArticles(scope.activeFeed).then(function (data) {
      scope.articles = data.query.results.feed.entry;
    });

    scope.$digest();
  }));

  describe('Article Loading', function () {
    it('should load articles from a service to display to the user', function () {
      expect(scope.articles.length).toBeGreaterThan(0);
    });

    it('should put the articles in a list on the scope after calling bootstrapArticles()', function () {
      scope.articles = [];
      scope.bootstrap();

      expect(scope.articles.length).toBeGreaterThan(0);
    });

    it('should clear the articles from the scope when loading new articles', function () {
      scope.loadArticles('Foobar');
      expect(scope.articles.length).toBe(0);
    });

    it('should load new articles when the activeFeed property changes', function () {
      scope.activeFeed = "AngularJS";
      
      scope.$digest();
      expect(scope.articles[0].content.title).toEqual('Angular');
    });

    it('should load new articles when loadArticles method is called', function () {
      scope.loading = false;
      scope.loadArticles();
      expect(scope.loading).toBe(true);
    });

    it('should change the route to show an article detail when calling showArticle', function () {
      scope.showArticle('http://hello-article');
      expect(location.url()).toContain('hello-article');
    });
  });
});
