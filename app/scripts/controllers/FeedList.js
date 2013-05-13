'use strict';

angular.module('ngswipeDemoApp')
  .controller('FeedListCtrl', ['$scope', '$rootScope', 'FeedManager', 'Articles', function ($scope, $rootScope, FeedManager, Articles) {

    $scope.showFeed = function (name) {
      $scope.activeFeed = name;
      FeedManager.setSelected(name);
    };

    $scope.saveFeed = function () {
      FeedManager.add($scope.newFeed.name, $scope.newFeed);
      FeedManager.setSelected($scope.newFeed.name);
      $scope.activeFeed = name;
      $scope.clearNewFeed();
    };

    $scope.deleteFeed = function (name) {
      FeedManager.remove(name);
    }

    $scope.bootstrap = function () {
      $scope.feeds = FeedManager.getAll();
      $scope.deletePrompts = {};
      $scope.$watch(function () {
        return FeedManager._feedsCache;
      }, updateFeeds);

      if ($scope.feeds.length && $scope.feeds[0].name) {
        $scope.activeFeed = $scope.feeds[0].name  
      }
    }

    function updateFeeds (newVal) {
      if (newVal === undefined || Array.isArray(newVal)) {
        $scope.feeds = newVal;
      }
    }

    $scope.bootstrap();
  }]);