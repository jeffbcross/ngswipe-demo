'use strict';

angular.module('ngswipeDemoApp')
  .factory('RecommendedFeeds', function () {
    return {
      'YouTube' : 'http://feeds.feedburner.com/youtube/PKJx',
      'Google': 'http://googleblog.blogspot.com/feeds/posts/default',
      'Google Maps' : 'http://google-latlong.blogspot.com/feeds/posts/default',
      'Android': 'http://feeds.feedburner.com/blogspot/hsDu', //icon: http://www.google.com/images/icons/product/android-48.png
      'Google Analytics': 'http://feeds.feedburner.com/blogspot/tRaA',
      'Google Developers': 'http://feeds.feedburner.com/GDBcode',
      'Google News': 'http://feeds.feedburner.com/GoogleNewsBlog',
      'Google+' : 'http://feeds.feedburner.com/GppBxyz'
    };
  });
