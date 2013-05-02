'use strict';

angular.module('ngswipeDemoApp')
  .controller('FeedListCtrl', ['$scope', 'feeds', function ($scope, feeds) {
    $scope.feeds = feeds.getAll();

    $scope.showFeed = function (name) {
      var feed = feeds.get(name);
      if (!feed) {
        $scope.activeFeed = undefined;
        return;
      }

      $scope.activeFeed = name;
    }
  }]);