'use strict';

angular.module('ngswipeDemoApp')
  .controller('ArticleDetailCtrl', ['$scope', '$rootScope', '$routeParams', '$window', 'Articles', 'FeedManager', function ($scope, $rootScope, $routeParams,$window, Articles, FeedManager) {

    $rootScope.pageAnimation = {enter: 'page-enter-left', leave: 'page-leave-right'};
    
    var feed = FeedManager.get($routeParams.feedId);
    $scope.detailFeed = Articles.fetch(feed.href);
    //TODO: Check index against actual position within feed, in case link is an outdated bookmark.
    $scope.articleIndex = $routeParams.index || 0;
    
    $scope.goBack = function () {
      $window.history.back();
    };
  }]);
