'use strict';

angular.module('ngswipeDemoApp')
  .directive('ioAddFeedForm', ['FeedManager', 'RecommendedFeeds', function (FeedManager, RecommendedFeeds) {
    return {
      templateUrl: 'views/io-add-feed-form.html',
      restrict: 'E',
      scope: {
        'feed' : '='
      },
      link: function postLink(scope, element, attrs) {
        scope.saveFeed = function () {
          FeedManager.add(scope.newFeed.name, scope.newFeed);
          FeedManager.setSelected(scope.newFeed.name);
          scope.newFeed = null;
          scope.newFeedForm = null;
        };

        scope.sources = RecommendedFeeds;

        scope.$watch('newFeed.name', function (name) {
          if (name && scope.sources[name]) {
            scope.newFeed.href = scope.sources[name];
            scope.newFeed.icon = '/img/rss.png';
          }
        });
      }
    };
  }]);
