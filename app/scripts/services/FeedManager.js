'use strict';

angular.module('ngswipeDemoApp')
  .factory('FeedManager', ['$window', function ($window) {
    var feeds
      , LOCAL_STORAGE_KEY = 'ngReaderFeeds'
      , localFeeds = $window.localStorage.getItem(LOCAL_STORAGE_KEY);

      if (localFeeds) {
        try {
          feeds = JSON.parse(localFeeds);  
        }
        catch (e) {
          //NO-OP
        }
      }

    feeds = feeds || {
      AngularJS: {
        href: 'http://www.blogger.com/feeds/7159470537406093899/posts/default',
        icon: 'https://secure.gravatar.com/avatar/f0d91e5cf8ad1ce7972cc486baa20c42?s=420&d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-org-420.png',
        name: 'AngularJS'
      },
      DailyJS: {
        href: 'http://dailyjs.com/atom.xml',
        icon: 'img/rss.png',
        name: 'DailyJS'
      },
      Chrome: {
        href: 'http://feeds2.feedburner.com/blogspot/Egta',
        icon: 'http://www.google.com/images/icons/product/chrome-48.png',
        name: 'Chrome'
      }
    };
    
    return {
      _feedsCache: [],

      getAll: function () {
        //returns feeds as an array
        var feedArray = []
          , feedKeys = Object.keys(feeds);

        angular.forEach(feedKeys, function (key) {
          if (feeds[key]) delete feeds[key]['$$hashKey']
          feedArray.push(feeds[key]);
        });

        this._feedsCache = feedArray;

        return feedArray;
      },
      get: function (name) {
        return feeds[name];
      },
      remove: function (name) {
        delete feeds[name];
        this.getAll();
        $window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(this._feedsCache));
      },
      add: function (name, meta) {
        if (typeof name === 'string' && name && meta && typeof meta.href === 'string') {
          meta.name = name;
          feeds[name] = meta;
          this.getAll();
          $window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(this._feedsCache));
        }
      }
    };
  }]);
