'use strict';

angular.module('ngswipeDemoApp')
  .factory('RecommendedFeeds', function () {
    return {
      'YouTube Blog' : {
        href: 'http://feeds.feedburner.com/youtube/PKJx',
        icon: 'http://www.google.com/images/icons/product/youtube-48.png'
      },
      'Google Blog': {
        href: 'http://googleblog.blogspot.com/feeds/posts/default'
      },
      'Google Maps Blog' : {
        href: 'http://google-latlong.blogspot.com/feeds/posts/default',
        icon: 'http://www.google.com/images/icons/product/maps-48.gif'
      },
      'Android Blog': {
        href: 'http://feeds.feedburner.com/blogspot/hsDu',
        icon: 'http://www.google.com/images/icons/product/android-48.png'
      },
      'Google Analytics Blog': {
        href: 'http://feeds.feedburner.com/blogspot/tRaA',
        icon: 'http://www.google.com/images/icons/product/analytics-48.png'
      },
      'Google Developers Blog': {
        href: 'http://feeds.feedburner.com/GDBcode'
      },
      'Google News Blog': {
        href: 'http://feeds.feedburner.com/GoogleNewsBlog',
        icon: 'http://www.google.com/images/icons/product/news-48.gif'
      },
      'Google+ Platform Blog' : {
        href: 'http://feeds.feedburner.com/GppBxyz'
      },
      'Gmail Blog': {
        href: 'http://feeds.feedburner.com/OfficialGmailBlog',
        icon: 'http://www.google.com/images/icons/product/googlemail-48.png'
      }
    };
  });
