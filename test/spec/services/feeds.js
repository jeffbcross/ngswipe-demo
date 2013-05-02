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

  it('should support addition of a feed through the "add" method', function () {
    feeds.add({name: 'Random Feed', href: "http://random.feed"});

    expect(feeds.get('Random Feed').name).toEqual('Random Feed');
  });

  it ('should not add a feed without a name', function () {
    var passes = true, all;
    feeds.add({href: 'http://google.com/feed'});
    
    all = feeds.getAll();
    for (var i = 0; i<all.length; i++) {
      expect(all[i].href).not.toEqual('http://google.com/feed');
    }
  });

  it ('should not add a feed without an href', function () {
    feeds.add({name: 'Google'});
    expect(feeds.get('Google')).toBe(undefined);
  });

  it('should remove a feed', function () {
    feeds.remove("Random Feed");
    expect(feeds.get("Random Feed")).toBe(undefined);
  });

});