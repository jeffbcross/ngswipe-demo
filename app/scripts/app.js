'use strict';

angular.module('ngswipeDemoApp', ['ngMobile', 'ngResource', 'ngSanitize', 'angular-carousel'])
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/articles/:feedId/:articleId', {
        templateUrl: 'views/ArticleDetail.html',
        controller: 'ArticleDetailCtrl'
      })
      .when('/feeds', {
        templateUrl: 'views/FeedList.html',
        controller: 'FeedListCtrl',
        reloadOnSearch: false
      })
      .otherwise({
        redirectTo: '/feeds'
      });
  }]);