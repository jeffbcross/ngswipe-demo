'use strict';

describe('Service: feeds', function () {

  // load the service's module
  beforeEach(module('ngswipeDemoApp'));

  // instantiate service
  var feeds;
  beforeEach(inject(function (_feeds_, localData, $injector) {
    feeds = _feeds_;
    localData = $injector.get('localData');

    localData.get = function () {
      return 'bar';
    }
  }));

  it('should provide a list of all feeds available for the user', function () {
    var list = feeds.getAll();
    expect(list.length).toBeGreaterThan(0);
  });

  it('should provide the currently-selected feed', function () {
    var feed = feeds.getSelected();

    expect(feed).toEqual('bar');
  });

});