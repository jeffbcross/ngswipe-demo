'use strict';

angular.module('ngswipeDemoApp')
  .controller('IOArticlePreviewCtrl', ['$scope', 'Articles', 'FeedManager', '$window', '$location', function ($scope, Articles, FeedManager, $window, $location) {

    var errorMessages = {
      LOADING_ERROR: "There was an error loading articles",
      NO_ARTICLES: "No articles are available."
    };

    $scope.$watch('activeFeed', $scope.bootstrap);
    
    $scope.loadArticles = function (name) {
      var promise
        , feedToLoad = FeedManager.get(name);

      $scope.loading = true;

      $scope.articles = [];

      if (feedToLoad && feedToLoad.href) {
        promise = Articles.fetch($window.encodeURIComponent(feedToLoad.href), 'feed.entry');
        return promise;  
      }
    };

    $scope.articlesLoaded = function (data) {
      var items, i;
      //If there was a problem loading data
      if (!data || !data.query || !data.query.results || !data.query.results.feed || !data.query.results.feed.entry || !Array.isArray(data.query.results.feed.entry)) {
        
        $scope.error = errorMessages.LOADING_ERROR;
      }
      //If there are just no articles in the results
      else if (!data.query.results.feed.entry.length) {
        $scope.error = errorMessages.NO_ARTICLES;
      }
      //Let's show some articles
      else {
        $scope.articles = [];
        items = data.query.results.feed.entry;
        
        for (i = 0; i < items.length; i++) {
          $scope.articles.push(Articles.normalize(items[i]));
        }
      }

      $scope.loading = false;
    };

    $scope.articlesLoadFailed = function (data, err) {
      $scope.error = errorMessages.LOADING_ERROR
    };

    $scope.bootstrap = function () {
      if ($scope.activeFeed) {
        $scope.loadArticles($scope.activeFeed).then($scope.articlesLoaded, $scope.articlesLoadFailed);
      }
    };

    $scope.showArticle = function (id) {
      $location.url('/articles/' + $window.encodeURIComponent(id));
    };

    $scope.articles = [];
    $scope.bootstrap();
  }]);
