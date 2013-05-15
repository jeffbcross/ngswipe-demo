'use strict';

angular.module('ngswipeDemoApp')
  .directive('ioAddFeedForm', ['FeedManager', 'RecommendedFeeds', '$location', '$window', function (FeedManager, RecommendedFeeds, $location, $window) {
    return {
      templateUrl: 'views/io-add-feed-form.html',
      restrict: 'E',
      scope: {
        'feed' : '='
      },
      link: function postLink(scope, element, attrs) {
        scope.saveFeed = function () {
          var name = scope.newFeed.name;
          FeedManager.add(name, scope.newFeed);

          scope.newFeed = null;
          scope.newFeedForm = null;

          $location.path('/feeds/' + name);

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
