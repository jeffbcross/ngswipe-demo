'use strict';

describe('Directive: spinner', function () {
  beforeEach(module('ngswipeDemoApp'));

  var element;

  it('should make hidden element visible', inject(function ($rootScope, $compile) {
    element = angular.element('<spinner></spinner>');
    element = $compile(element)($rootScope);

    expect(element.html()).toContain('class="spinner"');
  }));
});
