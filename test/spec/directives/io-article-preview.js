'use strict';

describe('Directive: ioArticlePreview', function () {
  beforeEach(module('ngswipeDemoApp', 'views/io-article-preview.html'));

  var element, $httpBackend, $compile, $rootScope, spinner;

  beforeEach(inject(function ($injector, _$compile_, _$rootScope_) {
    $compile  = _$compile_;
    $rootScope = _$rootScope_;
  }));

  it('should include the proper template', function () {
    element = $compile('<io-article-preview></io-article-preview>')($rootScope);
    $rootScope.$digest();
    expect(element.html()).toContain('<!--io-article-preview.html-->');
  });
});