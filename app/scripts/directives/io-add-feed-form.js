'use strict';

angular.module('ngswipeDemoApp')
  .directive('ioAddFeedForm', ['FeedManager', 'RecommendedFeeds', '$location', '$window', '$timeout', function (FeedManager, RecommendedFeeds, $location, $window, $timeout) {
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
        scope.$watch('newFeed', function (newVal, oldVal) {
          if (newVal && !oldVal) {
            //Focus on the name input
            $timeout(function () {
              $('#inputFeedName').focus();  
            }, 250);
          }
        });
        
        scope.$watch('newFeed.name', function (name) {
          if (name && scope.sources[name]) {
            scope.newFeed.href = scope.sources[name].href;
            scope.newFeed.icon = scope.sources[name].icon || 'img/rss.png';
          }
        });
      }
    };
  }]);
