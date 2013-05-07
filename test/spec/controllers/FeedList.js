'use strict';

describe('Controller: FeedListCtrl', function () {
  var FeedListCtrl, scope, FeedManager;

  // load the controller's module
  beforeEach(module('ngswipeDemoApp'));

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $injector) {
    scope = $rootScope.$new();
    FeedListCtrl = $controller('FeedListCtrl', {
      $scope: scope
    });

    FeedManager = $injector.get('FeedManager');
  }));

  it('should load a list of available feeds', function () {
    scope.$digest();
    expect(scope.feeds.length).toBeGreaterThan(0);
    expect(scope.feeds[0].href).toEqual('http://www.blogger.com/feeds/7159470537406093899/posts/default');
    expect(scope.feeds[1].href).toEqual('http://dailyjs.com/atom.xml');
  });
});
