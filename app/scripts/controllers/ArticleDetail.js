'use strict';

angular.module('ngswipeDemoApp')
  .controller('ArticleDetailCtrl', ['$scope', '$rootScope', '$routeParams', '$http', '$sanitize', '$window', 'Articles', 'FeedManager', '$location', function ($scope, $rootScope, $routeParams, $http, $sanitize, $window, Articles, FeedManager, $location) {
    
    var feed = FeedManager.getSelected();
    $scope.detailFeed = Articles.fetch(feed.href);
    //TODO: Check index against actual position within feed, in case link is an outdated bookmark.
    $scope.articleIndex = $routeParams.index || 0;
    
    $scope.goBack = function () {
      $window.history.back();
    };
  }]);
