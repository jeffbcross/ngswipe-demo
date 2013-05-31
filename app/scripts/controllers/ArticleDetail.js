'use strict';

angular.module('ngswipeDemoApp')
  .controller('ArticleDetailCtrl', ['$scope', '$rootScope', '$routeParams', '$window', 'Articles', 'FeedManager', 'detailFeed', function ($scope, $rootScope, $routeParams, $window, Articles, FeedManager, detailFeed) {
    
    $rootScope.pageAnimation = {enter: 'page-enter-left', leave: 'page-leave-right'};
    
    $scope.articleIndex = $routeParams.index || 0;
    $scope.detailFeed = detailFeed;
    
    $scope.goBack = function () {
      $window.history.back();
    };
  }]);
