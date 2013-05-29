'use strict';

describe('Service: FeedManager', function () {
  var FeedManager, $window;

  beforeEach(module('ngswipeDemoApp'));

  beforeEach(inject(function ($injector, _$window_) {
    FeedManager = $injector.get('FeedManager');
    $window = _$window_
  }));

  afterEach(function () {
    $window.localStorage.setItem('ngReaderFeeds', '');
  })

  it('should provide a list of all feeds available for the user', function () {
    var list = FeedManager.getAll();
    expect(list.length).toBeGreaterThan(0);
  });

  it('should support addition of a feed through the "add" method', function () {
    FeedManager.add('Random Feed', {href: "http://random.feed"});

    expect(FeedManager.get('Random Feed').name).toEqual('Random Feed');
  });

  it ('should not add a feed without a name', function () {
    var passes = true, all;
    FeedManager.add({href: 'http://google.com/feed'});
    
    all = FeedManager.getAll();
    for (var i = 0; i<all.length; i++) {
      expect(all[i].href).not.toEqual('http://google.com/feed');
    }
  });

  it ('should not add a feed without an href', function () {
    FeedManager.add({name: 'Google'});
    expect(FeedManager.get('Google')).toBe(undefined);
  });

  it('should remove a feed', function () {
    FeedManager.remove("Random Feed");
    expect(FeedManager.get("Random Feed")).toBe(undefined);
  });

  it('should remove $$hashKey from feeds', function () {
    expect(false).toBe(true);
  });

  describe('persistence', function () {
    it('should persist added feed to localStorage', function () {
      FeedManager.add('Random Feed', {href: "http://local.feed"});
      expect($window.localStorage.getItem('ngReaderFeeds')).toContain('http://local.feed');
    });

    it('should persist deleted feed removed from localStorage', function () {
      FeedManager.add('Deletable Feed', {'href': 'http://deletable'})
      FeedManager.remove('Deletable Feed');
      expect($window.localStorage.getItem('ngReaderFeeds')).not.toContain('http://deletable');
    });

    it('should save', function () {
      expect($window.localStorage.getItem('ngReaderFeeds')).not.toContain('save method test');
      FeedManager.add('save method test', {href: 'http://testURL'});
      expect($window.localStorage.getItem('ngReaderFeeds')).toContain('save method test');
    })

    it('should retrieve a feed by name if stored in localStorage', function () {
      FeedManager.add('RetrievableFeed', {'href': 'http://retrievable'});
      FeedManager._feedsCache = JSON.parse($window.localStorage.getItem('ngReaderFeeds'));
      expect(FeedManager.get('RetrievableFeed')).toBeDefined();
    });
  });
});
