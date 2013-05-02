'use strict';

angular.module('ngswipeDemoApp', ['ngMobile', 'ngResource', 'ngSanitize'])
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
