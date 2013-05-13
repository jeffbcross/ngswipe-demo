'use strict';

angular.module('ngswipeDemoApp', ['ngMobile', 'ngResource', 'ngSanitize', 'angular-carousel'])
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/articles/:articleId', {
        templateUrl: 'views/article.html',
        controller: 'ArticleDetailCtrl',
        depth: 1
      })
      .when('/', {
        templateUrl: 'views/feeds.html',
        controller: 'FeedListCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })

  .run(function ($rootScope) {
    $rootScope.$on('$routeChangeSuccess', function(e, current, previous) {
      $rootScope.controller = current ? current.controller : 'FeedListCtrl';
    });
  });
