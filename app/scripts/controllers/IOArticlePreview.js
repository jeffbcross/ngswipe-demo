'use strict';

angular.module('ngswipeDemoApp')
  .controller('IOArticlePreviewCtrl', 
    ['$scope', '$rootScope', 'Articles', 'FeedManager', '$window', '$location', function ($scope, $rootScope, Articles, FeedManager, $window, $location) {

    $scope.openArticle = function (id, index) {
      //Since it is part of a route, it must be encoded.
      if ($window.decodeURIComponent(id) === id) {
        id = $window.encodeURIComponent(id);
      }

      $rootScope.pageAnimation = {enter: 'page-enter-right', leave: 'page-leave-left'};

      $location.path('/articles/' + $location.search().feed + '/' + id).search({index: index});
    };

    $scope.loadArticles = function (name) {
      var feedToLoad = FeedManager.get(name);

      $scope.feed = {};

      if (feedToLoad && feedToLoad.href) {
        $scope.feed = Articles.fetch($window.encodeURIComponent(feedToLoad.href));
      }
    };

    $scope.$watch('activeFeed', function (feedId) {
      $scope.loadArticles(feedId);
    });
  }]);
