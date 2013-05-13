'use strict';

describe('Solo active list', function () {
  beforeEach(module('ngswipeDemoApp'));

  var element;

  beforeEach(inject(function($rootScope, $compile) {
    element = angular.element('' +
        '<ul solo-active-list>' +
        '  <li solo-active-item class="first"></li>' +
        '  <li solo-active-item class="second"></li>' +
        '</ul>');
    element = $compile(element)($rootScope);
    $rootScope.$digest();
  }))



  it('should set the first element active', inject(function ($rootScope, $compile) {
    expect(element.html()).toContain('class="first ng-scope selected"');
    // second is not selected.
    expect(element.html()).toContain('class="second ng-scope"');

  }));

  it('should set the second element active on click',
      inject(function ($rootScope, $compile) {
         angular.element(element.children()[1]).triggerHandler('click');
         expect(element.html()).toContain('class="first ng-scope"');
         expect(element.html()).toContain('class="second ng-scope selected"');
      })
  );
});
