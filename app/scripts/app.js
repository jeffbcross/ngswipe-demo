'use strict';

angular.module('ngswipeDemoApp', ['ngMobile', 'ngResource', 'ngSanitize', 'angular-carousel'])
  .config(function ($routeProvider, $locationProvider) {
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
      // direction is true (slide from left) if new depth is less than previous depth
      var direction = current && previous && current.depth < previous.depth;

      //"slide-left" means _slide from left_
      $rootScope.viewSlideAnimation = {
        enter: direction ? 'slide-left-enter' : 'slide-right-enter',
        leave: direction ? 'slide-right-leave' : 'slide-left-leave'
      }
      console.log('viewSlideAnimation', $rootScope.viewSlideAnimation);

    });
  });
