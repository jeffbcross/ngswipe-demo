'use strict';

angular.module('ngswipeDemoApp')
  .controller('IOArticlePreviewCtrl', ['$scope', 'feed', 'feeds', '$window', function ($scope, feed, feeds, $window) {
    var promise;
    $scope.loadArticles = function (name) {
      promise = feed.fetch($window.encodeURIComponent(feeds.get(name).href), 'feed.entry');
      return promise;
    }

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
