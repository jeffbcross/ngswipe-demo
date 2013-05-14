'use strict';

angular.module('ngswipeDemoApp')
  .controller('FeedListCtrl', ['$scope', 'FeedManager', function ($scope, FeedManager) {

    $scope.$watch('soloListActiveItem', function(activeItem) {
      if (activeItem) {
        $scope.activeFeed = name;
        FeedManager.setSelected(activeItem.feed.name);
    });

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
      var activeFeed;
      $scope.feeds = FeedManager.getAll();
      activeFeed = FeedManager.getSelected();
      if (activeFeed && activeFeed.name) {
        $scope.activeFeed = activeFeed.name;
      }
      else if ($scope.feeds.length && $scope.feeds[0].name) {
        $scope.activeFeed = $scope.feeds[0].name  
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
