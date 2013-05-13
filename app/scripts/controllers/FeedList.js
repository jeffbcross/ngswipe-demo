'use strict';

angular.module('ngswipeDemoApp')
  .controller('FeedListCtrl', ['$scope', '$rootScope', 'FeedManager', 'Articles', function ($scope, $rootScope, FeedManager, Articles) {

    $scope.showFeed = function (name) {
      console.log('showFeed', name);
      $scope.activeFeed = name;
      FeedManager.setSelected(name);
      console.log('$scope.activeFeed', $scope.activeFeed);
    }

    $scope.bootstrap = function () {
      $scope.feeds = FeedManager.getAll();

      if ($scope.feeds.length && $scope.feeds[0].name) {
        $scope.activeFeed = $scope.feeds[0].name  
      }
      
    }

    $scope.bootstrap();
  }]);