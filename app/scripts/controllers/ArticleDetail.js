'use strict';

angular.module('ngswipeDemoApp')
  .controller('ArticleDetailCtrl', ['$scope', '$http', '$sanitize', '$window', 'Articles', 'FeedManager', function ($scope, $http, $sanitize, $window, Articles, FeedManager) {
    $scope.bootstrap = function () {
      var feed = FeedManager.getSelected();

      $scope.pages = [];
      $scope.feed = { title: "Loading..." };
      
      Articles.fetch($window.encodeURIComponent(feed.href), 'feed').then(function (data) {
        $scope.pages = data.query.results.feed.entry;

        $scope.feed = {
          url: data.query.results.feed.link[1].href,
          title: data.query.results.feed.author.name
        };
      });
    };
    
    
    $scope.bootstrap();
  }]);
