'use strict';

describe('Controller: ArticleDetailCtrl', function () {
  // load the controller's module
  beforeEach(module('ngswipeDemoApp'));

  var ArticleDetailCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, articlesMock) {
    scope = $rootScope.$new();

    ArticleDetailCtrl = $controller('ArticleDetailCtrl', {
      $scope: scope,
      articles: articlesMock
    });
  }));

  it('should provide some pages', function () {
    scope.bootstrap();
    scope.$digest();
    expect(scope.pages.length).toBeGreaterThan(0);
  });
});
