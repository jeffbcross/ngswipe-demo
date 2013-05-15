'use strict';

angular.module('ngswipeDemoApp')
  .controller('FeedListCtrl', ['$scope', 'FeedManager', '$routeParams', '$location', '$window', function ($scope, FeedManager, $routeParams, $location, $window) {

    $scope.showFeed = function (feed) {
      $location.path('/feeds/' + feed.name);
    };

    $scope.deleteFeed = function (name) {
      FeedManager.remove(name);
    };

    $scope.bootstrap = function () {
      var activeFeed;
      $scope.feeds = FeedManager.getAll();
      if ($routeParams.feedId) {
        $scope.activeFeed = $routeParams.feedId;
      }
      else if ($scope.feeds.length && $scope.feeds[0].name) {
        $scope.showFeed($scope.feeds[0]);
      }

      $scope.deletePrompts = {};
      $scope.$watch(function () {
        return FeedManager._feedsCache;
      }, updateFeeds);
    }

    function updateFeeds (newVal) {
      if (newVal === undefined || Array.isArray(newVal)) {
        $scope.feeds = newVal;
      }
    }

    $scope.bootstrap();
  }]);
