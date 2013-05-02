'use strict';

describe('Controller: FeedListCtrl', function () {

  // load the controller's module
  beforeEach(module('ngswipeDemoApp'));

  var FeedListCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    FeedListCtrl = $controller('FeedListCtrl', {
      $scope: scope
    });
  }));

  it('should load a list of available feeds', function () {
    scope.$digest();
    expect(scope.feeds.length).toBeGreaterThan(0);
    expect(scope.feeds[0].href).toEqual('http://www.blogger.com/feeds/7159470537406093899/posts/default');
    expect(scope.feeds[1].href).toEqual('http://dailyjs.com/atom.xml');
  });

  it('should set the name of the active feed in the scope when calling showFeed()', function () {
    scope.showFeed('DailyJS');
    scope.$digest();

    expect(scope.activeFeed).toEqual('DailyJS');
  });

  it('should NOT set the name of the activeFeed on the scope when calling showFeed() with bad name', function () {
    scope.showFeed('Bogus');
    scope.$digest();

    expect(scope.activeFeed).toBeUndefined();
  })
});
