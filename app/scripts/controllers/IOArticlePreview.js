'use strict';

angular.module('ngswipeDemoApp')
  .controller('IOArticlePreviewCtrl', ['$scope', 'feed', 'feeds', function ($scope, feed, feeds) {
    // $scope.$watch('feed()', function (newVal) {
      // $scope.activeFeed = newVal;
    // });

    $scope.loadArticles = function () {
      return feed.fetch(feeds.get($scope.activeFeed.name).href);
    }

    // $scope.articlesLoaded = function (articles, err) {
    //   if (err) return;

    //   $scope.articles = articles;
    // }
        
    $scope.articles = [];
  }]);
