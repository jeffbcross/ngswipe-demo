'use strict';

angular.module('ngswipeDemoApp')
  .controller('IOArticlePreviewCtrl', function ($scope) {
    $scope.$watch('feed()', function () {
      console.log('feed', $scope.feed());
    });
        
    $scope.articles = [];
  });
