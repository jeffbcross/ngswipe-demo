'use strict';

angular.module('ngswipeDemoApp')
  .controller('ArticleDetailCtrl', ['$scope', '$rootScope', '$routeParams', '$http', '$sanitize', '$window', 'Articles', 'FeedManager', '$location', function ($scope, $rootScope, $routeParams, $http, $sanitize, $window, Articles, FeedManager, $location) {
    $scope.bootstrap = function () {
      var feed = FeedManager.getSelected();

      $scope.feed = Articles.fetch($window.encodeURIComponent(feed.href));
      
      $scope.$watch('feed', function (newVal) {
        if (newVal && newVal.entry && newVal.entry.length) {
          $scope.feed.url = $scope.feed.meta.href;
          $scope.feed.title =  $scope.feed.meta.title;

          for (var i = 0; i < $scope.feed.entries.length; i++) {
            if ($routeParameters.feedId($scope.feed.entries[i].id) > -1) {
              $scope.feed.entries = $scope.feed.entries.concat($scope.feed.entries.splice(0, i));
              $scope.pageIndex = i;
            }
          }    
        }
      })
    };
    
    $scope.bootstrap();
  }]);
