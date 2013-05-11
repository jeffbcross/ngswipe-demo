'use strict';

angular.module('ngswipeDemoApp')
  .controller('FeedListCtrl', ['$scope', '$rootScope', 'FeedManager', 'Articles', function ($scope, $rootScope, FeedManager, Articles) {

    $scope.showFeed = function (name) {
      $scope.activeFeed = name;
      FeedManager.setSelected(name);
    }

    $scope.bootstrap = function () {
      $scope.feeds = FeedManager.getAll();

      if ($scope.feeds.length && $scope.feeds[0].name) {
        $scope.activeFeed = $scope.feeds[0].name  
      }
      
    }

    $scope.bootstrap();
  }]);