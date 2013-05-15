'use strict';

angular.module('ngswipeDemoApp')
  .controller('IOArticlePreviewCtrl', ['$scope', 'Articles', 'FeedManager', '$window', '$location', '$routeParams', function ($scope, Articles, FeedManager, $window, $location, $routeParams) {

    var errorMessages = {
      LOADING_ERROR: "There was an error loading articles",
      NO_ARTICLES: "No articles are available."
    };

    $scope.openArticle = function (id, index) {
      //Since it is part of a route, it must be encoded.
      if ($window.decodeURIComponent(id) === id) {
        id = $window.encodeURIComponent(id);
      }
      
      Articles.setSelected(id);
      $location.path('/articles/' + $routeParams.feedId + '/' + id).search({index: index});
    }

    $scope.loadArticles = function (name) {
      var promise
        , feedToLoad = FeedManager.get(name);

      $scope.loading = true;

      $scope.feed = {};

      if (feedToLoad && feedToLoad.href) {
        $scope.feed = Articles.fetch($window.encodeURIComponent(feedToLoad.href));
      }
    };

    $scope.articlesLoaded = function (feed) {
      var items, i;
      //If there was a problem loading data
      if (!Array.isArray(feed.entries)) {
        $scope.error = errorMessages.LOADING_ERROR;
      }
      //If there are just no articles in the results
      else if (!feed.entries.length) {
        $scope.error = errorMessages.NO_ARTICLES;
      }
      //Let's show some articles
      else {
        $scope.articles = feed.entries;
      }

      $scope.loading = false;
    };

    $scope.setSelecteArticle = function (id) {
      Articles.setSelected(id);
    };
    
    $scope.articles = [];

    var feedId = $routeParams.feedId;
    if (feedId) {
      $scope.loadArticles(feedId);
    }
  }]);
