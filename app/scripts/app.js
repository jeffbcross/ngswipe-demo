'use strict';

angular.module('ngswipeDemoApp', ['ngMobile', 'ngResource', 'ngSanitize', 'angular-carousel'])
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/articles/:feedId', {
        templateUrl: '/views/article.html',
        controller: 'ArticleDetailCtrl',
        depth: 1
      })
      .when('/articles/', {
        templateUrl: '/views/article.html',
        controller: 'ArticleDetailCtrl',
        depth: 1
      })
      .when('/', {
        templateUrl: '/views/feeds.html',
        controller: 'FeedListCtrl',
        depth: 0
      })
      // .otherwise({
      //   redirectTo: '/'
      // });
  })

  .run(function ($rootScope) {
    $rootScope.$on('$routeChangeSuccess', function(e, current, previous) {
      $rootScope.controller = current.controller;
    });
  });
