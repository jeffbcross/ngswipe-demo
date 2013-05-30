'use strict';

angular.module('ngswipeDemoApp')
  .controller('FeedListCtrl', ['$scope', 'FeedManager', '$routeParams', '$location', '$rootScope', function ($scope, FeedManager, $routeParams, $location, $rootScope) {
    var updateFeeds;

    $rootScope.pageAnimation = {};

    $scope.showFeed = function (feed) {
      $location.path('/feeds/' + feed.name);
      $location.replace();
    };

    $scope.deleteFeed = function (name) {
      FeedManager.remove(name);
    };

    $scope.bootstrap = function () {
      $scope.feeds = FeedManager.getAll();
      if ($routeParams.feedId) {
        $scope.activeFeed = $routeParams.feedId;
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
