'use strict';

describe('Directive: followSwipe', function () {
  beforeEach(module('ngswipeDemoApp'));

  var element;

  it('should make hidden element visible', inject(function ($rootScope, $compile) {
    element = angular.element('<follow-swipe></follow-swipe>');
    element = $compile(element)($rootScope);
    expect(element.text()).toBe('this is the followSwipe directive');
  }));
});
