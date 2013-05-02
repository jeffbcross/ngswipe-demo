'use strict';

angular.module('ngswipeDemoApp')
  .controller('FeedListCtrl', ['$scope', 'feeds', function ($scope, feeds) {
    $scope.feeds = feeds.getAll();
    console.log($scope.feeds);
  }]);