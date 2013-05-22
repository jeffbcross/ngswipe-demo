'use strict';

angular.module('ngswipeDemoApp', ['ngMobile', 'ngResource', 'ngSanitize', 'angular-carousel'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/articles/:feedId/:articleId', {
        templateUrl: 'views/article.html',
        controller: 'ArticleDetailCtrl'
      })
      .when('/feeds/:feedId', {
        templateUrl: 'views/feeds.html',
        controller: 'FeedListCtrl'
      })
      .otherwise({
        redirectTo: '/feeds/'
      });
  })

  .run(function ($rootScope) {
    $rootScope.$on('$routeChangeSuccess', function(e, current, previous) {
      $rootScope.controller = current ? current.controller : 'FeedListCtrl';
    });

    $rootScope.pageEnterAnimation = function () {
      return 'page-enter';
    };

    $rootScope.pageLeaveAnimation = function () {
      return 'page-leave';
    }
  });
