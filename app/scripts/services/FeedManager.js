'use strict'; 

angular.module('ngswipeDemoApp')
  .factory('FeedManager', function () {
    var selected
      , feeds = {
      AngularJS: {
        href: 'http://www.blogger.com/feeds/7159470537406093899/posts/default',
        icon: "/img/rss.png",
        name: "AngularJS"
      },
      DailyJS: {
        href: 'http://dailyjs.com/atom.xml',
        icon: "/img/rss.png",
        name: "DailyJS"
      }
    };
    
    return {
      getSelected: function () {
        return selected = selected ? selected : feeds[Object.keys(feeds)[0]];
      },
      setSelected: function (name) {
        if (typeof feeds[name] === "object") {
          selected = feeds[name];
        }
      },
      getAll: function () {
        //returns feeds as an array
        var feedArray = []
          , feedKeys = Object.keys(feeds);

        angular.forEach(feedKeys, function (key) {
          feedArray.push(feeds[key]);
        });

        return feedArray;
      },
      get: function (name) {
        return feeds[name];
      },
      remove: function (name) {
        delete feeds[name];
      },
      add: function (name, meta) {
        if (typeof name === "string" && name && meta && typeof meta.href === "string") {
          meta.name = name;
          feeds[name] = meta;
        }
      }
    };
  });
