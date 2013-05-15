'use strict';

angular.module('ngswipeDemoApp')
  .factory('RecommendedFeeds', function () {
    return {
      'YouTube Blog' : 'http://feeds.feedburner.com/youtube/PKJx',
      'Google Blog': 'http://googleblog.blogspot.com/feeds/posts/default',
      'Google Maps Blog' : 'http://google-latlong.blogspot.com/feeds/posts/default',
      'Android Blog': 'http://feeds.feedburner.com/blogspot/hsDu', //icon: http://www.google.com/images/icons/product/android-48.png
      'Google Analytics Blog': 'http://feeds.feedburner.com/blogspot/tRaA',
      'Google Developers Blog': 'http://feeds.feedburner.com/GDBcode',
      'Google News Blog': 'http://feeds.feedburner.com/GoogleNewsBlog',
      'Google+ Platform Blog' : 'http://feeds.feedburner.com/GppBxyz',
      'Gmail Blog': 'http://feeds.feedburner.com/OfficialGmailBlog',
      'Google Open Source Blog': 'http://feeds.feedburner.com/GoogleOpenSourceBlog'
    };
  });
