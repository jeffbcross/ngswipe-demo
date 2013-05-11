'use strict';

angular.module('ngswipeDemoApp')
  .filter('striptags', function () {
    return function (input) {
      var output = input.replace(/<\b[^>]*>/g, '');
      output = output.replace(/<\/.*?>/g, '');
      return output;
    };
  });
