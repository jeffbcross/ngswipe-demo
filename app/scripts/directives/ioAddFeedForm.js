'use strict';

angular.module('ngswipeDemoApp')
  .directive('ioAddFeedForm', function () {
    return {
      templateUrl: 'views/ioAddFeedForm.html',
      restrict: 'E',
      controller: 'IOAddFeedFormCtrl',
      scope: {
        'feed' : '='
      },
      link: function () {}
    };
  });
