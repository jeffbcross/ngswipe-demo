'use strict';

angular.module('ngswipeDemoApp')
  .directive('spinner', function () {
    return {
      template: '<div></div>',
      restrict: 'EA',
      link: function postLink(scope, element, attrs) {
        console.log('element', element);
        var s = new Spinner({color:'#666', lines: 12}).spin(element[0]);
      }
    };
  });
