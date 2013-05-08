'use strict';

angular.module('ngswipeDemoApp', ['ngMobile', 'ngResource', 'ngSanitize', 'angular-carousel'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/articles/:feedId', {
        templateUrl: 'views/article.html',
        controller: 'ArticleDetailCtrl'
      })
      .when('/', {
        templateUrl: 'views/feeds.html',
        controller: 'FeedListCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
