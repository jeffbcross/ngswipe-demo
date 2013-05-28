'use strict';

angular.module('ngswipeDemoApp', ['ngMobile', 'ngResource', 'ngSanitize', 'angular-carousel'])
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/articles/:feedId/:articleId', {
        templateUrl: 'views/article.html',
        controller: 'ArticleDetailCtrl',
        depth: 1
      })
      .when('/feeds/:feedId', {
        templateUrl: 'views/feeds.html',
        controller: 'FeedListCtrl',
        depth: 0
      })
      .otherwise({
        redirectTo: '/feeds/'
      });
  }]);