'use strict';

angular.module('ngswipeDemoApp')
  .directive('ioAddFeedForm', [ '$location', '$window', function ($location, $window) {
    return {
      templateUrl: 'ngClick-bug-directive.html',
      restrict: 'E',
      scope: {
        'feed' : '='
      },
      link: function postLink(scope, element, attrs) {
      }
    };
  }]);
