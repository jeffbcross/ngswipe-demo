'use strict';

describe('Controller: ArticleDetailCtrl', function () {
  // load the controller's module
  beforeEach(module('ngswipeDemoApp'));

  var ArticleDetailCtrl, scope, FeedManager;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, ArticlesMock, FeedManager) {
    FeedManager.setSelected('DailyJS');
    scope = $rootScope.$new();

    ArticleDetailCtrl = $controller('ArticleDetailCtrl', {
      $scope: scope,
      Articles: ArticlesMock,
      $routeParams: { articleId: 'http://hello' }
    });
  }));

  it('should have a feed', function () {
    // scope.bootstrap();
    scope.$digest();
    console.log('scope.feed', scope.feed);
    expect(scope.feed.entries.length).toBeGreaterThan(0);
  });

  it('should place the selected article at the beginning of the pages', function () {
    // scope.bootstrap();
    scope.$digest();
    expect(scope.feed.entries[0].id).toEqual('Article2');
  }) 
});
