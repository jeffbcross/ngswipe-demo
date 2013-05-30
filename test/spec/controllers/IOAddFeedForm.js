"use strict";

describe('Add Feed Form', function () {
  beforeEach(module('ngswipeDemoApp'));
  var location, scope, IOAddFeedFormCtrl;

  beforeEach(inject(function ($controller, $rootScope, $injector, $location) {
    scope = $rootScope.$new();
    
    IOAddFeedFormCtrl = $controller('IOAddFeedFormCtrl', {
      $scope: scope
    });

    location = $location;
    scope.$digest();
  }));

  it('should change the location.search when adding a feed', function () {
    scope.newFeed = { name: 'Sample Feed', href: 'http://samplefeed' };
    scope.saveFeed();
    scope.$digest();
    console.log('$location.path', location.path());
    console.log('$location.search', location.search());
    expect(location.path()).toEqual('');
    expect(location.search()).toEqual({feed: 'Sample Feed'});
  });
})