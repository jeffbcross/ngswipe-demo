'use strict';

angular.module('ngswipeDemoApp')
  .controller('ArticleDetailCtrl', ['$scope', '$rootScope', '$routeParams', '$http', '$sanitize', '$window', 'Articles', 'FeedManager', '$location', function ($scope, $rootScope, $routeParams, $http, $sanitize, $window, Articles, FeedManager, $location) {
    $scope.bootstrap = function () {
      var feed = FeedManager.getSelected();
      $scope.articleIndex = $routeParams.index || 0;
      $scope.detailFeed = Articles.fetch(feed.href);
    };

    $scope.goBack = function () {
      $window.history.back();
    };
    
    $scope.bootstrap();
  }]);
