'use strict';

angular.module('ngswipeDemoApp', ['ngMobile', 'ngResource', 'ngSanitize', 'angular-carousel'])
  .config(function ($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);

    $routeProvider
      .when('/articles/:feedId', {
        templateUrl: '/views/article.html',
        controller: 'ArticleDetailCtrl',
        depth: 1
      })
      .when('/', {
        templateUrl: '/views/feeds.html',
        controller: 'FeedListCtrl',
        depth: 0
      })
      .otherwise({
        redirectTo: '/'
      });
  })

  .run(function ($rootScope) {
    $rootScope.$on('$routeChangeSuccess', function(e, current, previous) {
      var direction = current && previous && current.depth < previous.depth;

      $rootScope.viewSlideAnimation = {
        enter: direction ? 'slide-left-enter' : 'slide-right-enter',
        leave: direction ? 'slide-right-leave' : 'slide-left-leave'
      }
      console.log('viewSlideAnimation', $rootScope.viewSlideAnimation);

    });
  });
