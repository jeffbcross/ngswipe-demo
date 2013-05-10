'use strict';

angular.module('ngswipeDemoApp')
  .controller('ArticleDetailCtrl', ['$scope', '$rootScope', '$routeParams', '$http', '$sanitize', '$window', 'Articles', 'FeedManager', '$location', function ($scope, $rootScope, $routeParams, $http, $sanitize, $window, Articles, FeedManager, $location) {
    $scope.bootstrap = function () {
      var feed = FeedManager.getSelected();

      $scope.detailFeed = Articles.fetch(feed.href);
      
      $scope.$watch('detailFeed', function (newVal) {
        if (newVal && newVal.entries) {
          if ($routeParams.articleId) {
            for (var i = 0; i < newVal.entries.length; i++) {
              if ($routeParams.articleId.indexOf(newVal.entries[i].id) > -1) {

                $scope.detailFeed.entries = newVal.entries.concat(newVal.entries.splice(0, i));
                $scope.pageIndex = i;
              }
            }    
          }
        }
      });
    };
    
    $scope.bootstrap();
  }]);
