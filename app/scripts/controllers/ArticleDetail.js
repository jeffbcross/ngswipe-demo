'use strict';

angular.module('ngswipeDemoApp')
  .controller('ArticleDetailCtrl', ['$scope', '$http', '$sanitize', '$window', 'Articles', 'FeedManager', function ($scope, $http, $sanitize, $window, Articles, FeedManager) {
    $scope.bootstrap = function () {
      var feed = FeedManager.getSelected();

      $scope.pages = [];
      $scope.feed = { title: "Loading..." };
      
      Articles.fetch($window.encodeURIComponent(feed.href))
        .then(function (feed) {
          $scope.pages = feed.entries;

          $scope.feed = {
            url: feed.meta.href,
            title: feed.meta.title
          };
        });
    };
    
    $scope.bootstrap();
  }]);
