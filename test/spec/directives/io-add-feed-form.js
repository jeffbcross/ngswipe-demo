'use strict';

describe('Directive: ioAddFeedForm', function () {
  beforeEach(module('ngswipeDemoApp', 'views/ioAddFeedForm.html'));

  var element;

  it('should make hidden element visible', inject(function ($rootScope, $compile) {
    element = angular.element('<io-add-feed-form></io-add-feed-form>');
    element = $compile(element)($rootScope);
    $rootScope.$digest();
    expect(element.text()).toContain('Add Atom Feed');
  }));
});
