'use strict';

angular.module('ngswipeDemoApp')
  .controller('FeedListCtrl', ['$scope', '$rootScope', 'FeedManager', 'Articles', function ($scope, $rootScope, FeedManager, Articles) {

    $scope.showFeed = function (name) {
      $scope.activeFeed = name;
      FeedManager.setSelected(name);
    };

    $scope.newFeedForm = function () {
      $scope.newFeed = {icon: '/img/rss.png'};
    };

    $scope.saveFeed = function () {
      FeedManager.add($scope.newFeed.name, $scope.newFeed);
      FeedManager.setSelected($scope.newFeed.name);
      $scope.clearNewFeed();
    };

    $scope.clearNewFeed = function () {
      $scope.newFeed = undefined;
    };

    $scope.bootstrap = function () {
      $scope.feeds = FeedManager.getAll();

      if ($scope.feeds.length && $scope.feeds[0].name) {
        $scope.activeFeed = $scope.feeds[0].name  
      }
    }

    $scope.bootstrap();
  }]);