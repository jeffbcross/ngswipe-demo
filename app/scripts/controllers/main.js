'use strict';

angular.module('ngswipeDemoApp')
  .controller('MainCtrl', function ($scope) {
    $scope.pages = [
      {
        id: 1,
        color: 'red'
      }, {
        id: 2,
        color: 'blue'
      }, {
        id: 3,
        color: 'green'
      }, {
        id: 4,
        color: 'yellow'
      }, {
        id: 5,
        color: 'pink'
      }, {
        id: 6,
        color: 'cyan'
      }
    ];
  });
