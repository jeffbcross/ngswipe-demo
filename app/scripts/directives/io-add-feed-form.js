'use strict';

angular.module('ngswipeDemoApp')
  .directive('ioAddFeedForm', function (FeedManager) {
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
          scope.newFeed = undefined;
        };
      }
    };
  });
