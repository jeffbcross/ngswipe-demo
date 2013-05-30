'use strict';

angular.module('ngswipeDemoApp')
  .directive('ioArticlePreview', function () {
    return {
      templateUrl: 'views/ioArticlePreview.html',
      restrict: 'EA',
      controller: 'IOArticlePreviewCtrl'
    };
  });
