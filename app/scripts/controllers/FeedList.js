'use strict';

angular.module('ngswipeDemoApp')
  .controller('FeedListCtrl', ['$scope', 'feeds', function ($scope, feeds) {

    

    $scope.showFeed = function (name) {
      var feed = feeds.get(name);
      if (!feed) {
        $scope.activeFeed = undefined;
        return;
      }

      $scope.activeFeed = name;
    }

    function bootstrap () {
      $scope.feeds = feeds.getAll();

      if ($scope.feeds.length && $scope.feeds[0].name) {
        $scope.activeFeed = $scope.feeds[0].name  
      }
      
    }

    bootstrap();
  }]);