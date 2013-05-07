'use strict';

angular.module('ngswipeDemoApp')
  .controller('IOArticlePreviewCtrl', ['$scope', 'articles', 'feeds', '$window', '$location', function ($scope, articles, feeds, $window, $location) {

    var errorMessages = {
      LOADING_ERROR: "There was an error loading articles",
      NO_ARTICLES: "No articles are available."
    };
    
    $scope.loadArticles = function (name) {
      var promise
        , feedToLoad = feeds.get(name);

      $scope.loading = true;

      $scope.articles = [];

      if (feedToLoad && feedToLoad.href) {
        promise = articles.fetch($window.encodeURIComponent(feedToLoad.href), 'feed.entry');
        return promise;  
      }
    };

    $scope.articlesLoaded = function (res) {
      var items, i;
      //If there was a problem loading data
      if (!res || !res.data || !res.data.query || !res.data.query.results || !res.data.query.results.entry || !Array.isArray(res.data.query.results.entry)) {
        
        $scope.error = errorMessages.LOADING_ERROR;
      }
      //If there are just no articles in the results
      else if (!res.data.query.results.entry.length) {
        $scope.error = errorMessages.NO_ARTICLES;
      }
      //Let's show some articles
      else {
        $scope.articles = [];
        items = res.data.query.results.entry;
        
        for (i = 0; i < items.length; i++) {
          $scope.articles.push(articles.normalize(items[i]));
        }
      }

      $scope.loading = false;
    };

    $scope.articlesLoadFailed = function (res, err) {
      $scope.error = errorMessages.LOADING_ERROR
    };

    $scope.bootstrapArticles = function () {
      if ($scope.activeFeed) {
        $scope.loadArticles($scope.activeFeed).then($scope.articlesLoaded, $scope.articlesLoadFailed);
      }
    };

    $scope.showArticle = function (id) {
      $location.url('/articles/' + $window.encodeURIComponent(id));
    };

    $scope.reloadArticles = function () {
      console.log('reloadArticles');
    }

    $scope.articles = [];
    $scope.bootstrapArticles();
  }]);
