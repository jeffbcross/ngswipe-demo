'use strict';

angular.module('ngswipeDemoApp')
  .controller('FeedListCtrl', ['$scope', 'FeedManager', '$routeParams', '$location', '$rootScope', function ($scope, FeedManager, $routeParams, $location, $rootScope) {
    var updateFeeds;

    $rootScope.pageAnimation = {enter: 'page-enter-right', leave: 'page-leave-left'};

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

      $scope.deletePrompts = {};
      $scope.$watch(function () {
        return FeedManager._feedsCache;
      }, updateFeeds);
    };

    updateFeeds = function (newVal) {
      if (newVal === undefined || Array.isArray(newVal)) {
        $scope.feeds = newVal;
      }
    };

    $scope.bootstrap();
  }]);
