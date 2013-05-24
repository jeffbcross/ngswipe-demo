'use strict';

angular.module('ngswipeDemoApp')
  .directive('ioArticlePreview', function () {
    return {
      templateUrl: 'views/io-article-preview.html',
      restrict: 'EA',
      controller: 'IOArticlePreviewCtrl'
    };
  });
