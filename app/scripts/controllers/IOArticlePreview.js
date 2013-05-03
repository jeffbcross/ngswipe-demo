'use strict';

angular.module('ngswipeDemoApp')
  .controller('IOArticlePreviewCtrl', ['$scope', 'feed', 'feeds', '$window', function ($scope, feed, feeds, $window) {
    $scope.loadArticles = function () {
      return feed.fetch(feeds.get($window.encodeURIComponent($scope.activeFeed)).href, 'feed.entry');
    }

    $scope.articles = [];
  }]);
