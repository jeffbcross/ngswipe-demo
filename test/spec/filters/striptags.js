'use strict';

describe('Filter: striptags', function () {

  // load the filter's module
  beforeEach(module('ngswipeDemoApp'));

  // initialize a new instance of the filter before each test
  var striptags;
  beforeEach(inject(function ($filter) {
    striptags = $filter('striptags');
  }));

  it('should strip html tags out of a block of text', function () {
    var text = 'Angular js is <strike>BAD</strike> <strong class="uberclass">GOOD!</strong> <br /><img src="favicon.ico" />';
    expect(striptags(text)).toBe('Angular js is BAD GOOD! ');
  });
});
