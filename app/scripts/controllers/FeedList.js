'use strict';

angular.module('ngswipeDemoApp')
  .controller('FeedListCtrl', ['$scope', 'FeedManager', '$location', '$rootScope', function ($scope, FeedManager, $location, $rootScope) {
    var updateFeeds;

    $rootScope.pageAnimation = {};

    $scope.showFeed = function (feed) {
      $location.search({ feed: feed.name });
      $scope.activeFeed = feed.name;
    };

    $scope.deleteFeed = function (name) {
      FeedManager.remove(name);
    };

    $scope.bootstrap = function () {
      $scope.feeds = FeedManager.getAll();
      if ($location.search().feed) {
        $scope.activeFeed = $location.search().feed;
      }
      else if ($scope.feeds.length && $scope.feeds[0].name) {
        $scope.showFeed($scope.feeds[0]);
      }

      $scope.$watch(function () {
        return FeedManager.getAll();
      }, updateFeeds, true);
    };

    updateFeeds = function (newVal) {
      var firstFeed;

      if (newVal === undefined || Array.isArray(newVal)) {
        $scope.feeds = newVal;
      }

      if (!FeedManager.get($scope.activeFeed)) {
        firstFeed = FeedManager.getAll()[0];

        $scope.activeFeed = firstFeed ? firstFeed.name : '';
        $scope.showFeed(firstFeed);
      }
    };

    $scope.bootstrap();
  }]);
