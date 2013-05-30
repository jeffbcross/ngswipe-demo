'use strict';

angular.module('ngswipeDemoApp')
  .factory('FeedManager', ['$window', function ($window) {
    var feeds
      , LOCAL_STORAGE_KEY = 'ngReaderFeeds'
      , localFeeds = $window.localStorage.getItem(LOCAL_STORAGE_KEY);

    
    try {
      feeds = localFeeds ? JSON.parse(localFeeds) : null;
    }
    catch (e) {
      //NO-OP
    }
    
    return {
      _feedsCache: feeds || [{
        href: 'http://www.blogger.com/feeds/7159470537406093899/posts/default',
        icon: 'https://secure.gravatar.com/avatar/f0d91e5cf8ad1ce7972cc486baa20c42?s=420&d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-org-420.png',
        name: 'AngularJS'
      },
      {
        href: 'http://dailyjs.com/atom.xml',
        icon: 'img/rss.png',
        name: 'DailyJS'
      },
      {
        href: 'http://feeds2.feedburner.com/blogspot/Egta',
        icon: 'http://www.google.com/images/icons/product/chrome-48.png',
        name: 'Chrome'
      }],

      getAll: function () {
        return this._feedsCache;
      },
      get: function (name) {
        var selected;

        angular.forEach(this._feedsCache, function (feed, key) {
          if (key === name || feed && feed.name === name) {
            selected = feed;
          }
        });

        return selected;
      },
      save: function () {
        var stringified = JSON.stringify(this._feedsCache);
        
        if (stringified.indexOf('$$hashKey')) {
          angular.forEach(this._feedsCache, function (feed) {
            delete feed.$$hashKey;
          });

          stringified = JSON.stringify(this._feedsCache);
        }

        $window.localStorage.setItem(LOCAL_STORAGE_KEY, stringified);
      },
      remove: function (name) {
        var self = this;
        
        angular.forEach(this._feedsCache, function (feed, i) {
          if (feed.name === name) {
            self._feedsCache.splice(i, 1);
          }
        });

        this.save();
      },
      add: function (name, meta) {
        if (typeof name === 'string' && name && meta && typeof meta.href === 'string') {
          meta.name = name;
          this._feedsCache.push(meta);
          this.save();
        }
      }
    };
  }]);
