'use strict';

angular.module('ngswipeDemoApp')
  .directive('ioArticlePreview', function () {
    return {
      templateUrl: 'views/io-article-preview.html',
      restrict: 'A',
      scope: {
        "activeFeed": "=ioArticlePreview"
      },
      controller: 'IOArticlePreviewCtrl'
    };
  });
