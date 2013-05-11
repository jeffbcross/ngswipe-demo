'use strict';

describe('Filter: preview', function () {

  // load the filter's module
  beforeEach(module('ngswipeDemoApp'));

  // initialize a new instance of the filter before each test
  var preview;
  beforeEach(inject(function ($filter) {
    preview = $filter('preview');
  }));

  it('should return the plaintext of the first paragraph of text', function () {
    expect(preview(twoParagraphs)).toBe(twoParagraphsOutput);
  });

  it('should return a max of two hundred words, with an ellipsis', function () {
    expect(preview(oneLongParagraph)).toEqual(oneLongParagraphOutput);
  });

  it('should create a preview from html without paragraphs', function () {
    expect(preview(noPText)).toEqual(noPTextOutput);
  });

});
