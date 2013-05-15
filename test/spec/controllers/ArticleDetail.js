'use strict';

describe('Controller: ArticleDetailCtrl', function () {
  // load the controller's module
  beforeEach(module('ngswipeDemoApp'));

  var ArticleDetailCtrl, scope, FeedManager;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, ArticlesMock, FeedManager) {
    scope = $rootScope.$new();

    ArticleDetailCtrl = $controller('ArticleDetailCtrl', {
      $scope: scope,
      Articles: ArticlesMock,
      $routeParams: { articleId: 'http://hello', feedId: 'DailyJS' }
    });
  }));

  it('should have a feed', function () {
    scope.$digest();
    expect(scope.detailFeed.entries.length).toBeGreaterThan(0);
  });
});
