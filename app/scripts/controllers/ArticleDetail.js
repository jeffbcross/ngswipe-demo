'use strict';

angular.module('ngswipeDemoApp')
  .controller('ArticleDetailCtrl', ['$scope', '$http', '$sanitize', '$window', 'articles', 'feeds', function ($scope, $http, $sanitize, $window, articles, feeds) {
    $scope.bootstrap = function () {
      var feed = feeds.getSelected();
      
      articles.fetch($window.encodeURIComponent(feed.href), 'feed').then(function (data) {
        $scope.pages = data.query.results.feed.entry;

        $scope.feed = {
          url: data.query.results.feed.link[1].href,
          title: data.query.results.feed.author.name
        };
      });
    };
    
    $scope.pages = [];
    $scope.feed = { title: "Loading..." };
    $scope.bootstrap();
  }]);
