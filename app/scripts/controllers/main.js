'use strict';

angular.module('ngswipeDemoApp')
  .controller('MainCtrl', function ($scope) {
  	$scope.swipeLeft = function () {
  		console.log('swiped left');
  	};

  	$scope.swipeRight = function () {
  		console.log('swiped right');
  	};
  	
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
