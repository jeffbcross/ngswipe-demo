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

  it('should show a spinner while there are no articles on the scope', function () {
    spinner = element.find('div');
    
    expect(spinner.css('display')).toEqual('');
    expect(spinner.hasClass('spinner')).toBe(true);
  });
});