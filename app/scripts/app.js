'use strict';

angular.module('ngswipeDemoApp', ['ngMobile', 'ngResource', 'ngSanitize', 'angular-carousel'])
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/articles/:feedId/:articleId', {
        templateUrl: 'views/article.html',
        controller: 'ArticleDetailCtrl'
      })
      .when('/feeds', {
        templateUrl: 'views/feeds.html',
        controller: 'FeedListCtrl',
        reloadOnSearch: false
      })
      .otherwise({
        redirectTo: '/feeds'
      });
  }]);