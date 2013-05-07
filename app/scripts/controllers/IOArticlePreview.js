'use strict';

angular.module('ngswipeDemoApp')
  .controller('IOArticlePreviewCtrl', ['$scope', 'Articles', 'FeedManager', '$window', '$location', function ($scope, Articles, FeedManager, $window, $location) {

    var errorMessages = {
      LOADING_ERROR: "There was an error loading articles",
      NO_ARTICLES: "No articles are available."
    };

    $scope.loadArticles = function (name) {
      var promise
        , feedToLoad = FeedManager.get(name);

      $scope.loading = true;

      $scope.articles = [];

      if (feedToLoad && feedToLoad.href) {
        promise = Articles.fetch($window.encodeURIComponent(feedToLoad.href));
        return promise;  
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

    $scope.articlesLoadFailed = function (data, err) {
      $scope.error = errorMessages.LOADING_ERROR
    };

    $scope.bootstrap = function () {
      $scope.loadArticles(FeedManager.getSelected().name).then($scope.articlesLoaded, $scope.articlesLoadFailed);
    };

    $scope.showArticle = function (id) {
      $location.url('/articles/' + $window.encodeURIComponent(id));
    };
    
    $scope.articles = [];
    $scope.$watch(function () {
      return FeedManager.getSelected();
    }, $scope.bootstrap);
  }]);
