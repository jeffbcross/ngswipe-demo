'use strict'; 

angular.module('ngswipeDemoApp')
  .factory('feeds', function (localData) {
    var selected, feeds = [{
      href: 'http://www.blogger.com/feeds/7159470537406093899/posts/default',
      name: 'AngularJS',
      icon: "/img/rss.png"
    },{
      href: 'http://dailyjs.com/atom.xml',
      name: 'DailyJS',
      icon: "/img/rss.png"
    }];
    // Public API here
    return {
      getSelected: function () {
        return localData.get();
      },
      getAll: function () {
        return feeds;
      },
      get: function (name) {
        var i;
        for (i = 0; i<feeds.length; i++) {
          if (feeds[i].name === name) {
            return feeds[i];
          }
        }
        return;
      },
      remove: function (name) {
        var i;
        for (i = 0; i < feeds.length; i++) {
          if (feeds[i].name === name) {
            feeds.splice(i, 1);
            break;
          }
        }
      },
      add: function (feed) {
        if (feed.name && feed.href) {
          feeds.push(feed);
        }
      }
    };
  });
