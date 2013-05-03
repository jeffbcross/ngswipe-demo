'use strict';

angular.module('ngswipeDemoApp')
  .controller('IOArticlePreviewCtrl', ['$scope', 'articles', 'feeds', '$window', function ($scope, articles, feeds, $window) {
    
    $scope.loadArticles = function (name) {
      var promise
        , feedToLoad = feeds.get(name);

      $scope.articles = [];

      if (feedToLoad && feedToLoad.href) {
        promise = articles.fetch($window.encodeURIComponent(feedToLoad.href), 'feed.entry');
        return promise;  
      }
    };

    $scope.bootstrapArticles = function () {
      if ($scope.activeFeed) {
        $scope.loadArticles($scope.activeFeed).then(function (res) {
          if (res.data) {
            $scope.articles = res.data.query.results.feed.entry;
          }
        });  
      }
    };

    $scope.articles = [];
  }]);
