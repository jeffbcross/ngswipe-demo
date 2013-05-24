'use strict';

angular.module('ngswipeDemoApp', ['ngMobile', 'ngResource', 'ngSanitize', 'angular-carousel'])
  .config(['$routeProvider', function ($routeProvider) {
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
  }])

  .run(function ($rootScope, $route) {
    var previousTemplate = $route.current ? $route.current.loadedTemplateUrl : $route.loadedTemplateUrl;

    $rootScope.$on('$routeChangeSuccess', function(e, current) {
      $rootScope.controller = current ? current.controller : 'FeedListCtrl';
      previousTemplate = $route.current ? $route.current.loadedTemplateUrl : $route.loadedTemplateUrl;
    });

    $rootScope.pageAnimation = {enter: '', leave: ''};

    function onRouteChange () {
      var shouldAnimate = !(!$route.current || !previousTemplate || $route.current.loadedTemplateUrl === previousTemplate);
      $rootScope.pageAnimation = shouldAnimate ? { enter: 'page-enter-right', leave: 'page-leave-left' } : { enter: '', leave: '' };
    }
    
    $rootScope.$on('$routeChangeStart', onRouteChange);
  });
