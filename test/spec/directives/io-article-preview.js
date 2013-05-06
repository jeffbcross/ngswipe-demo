'use strict';

describe('Directive: ioArticlePreview', function () {
  beforeEach(module('ngswipeDemoApp', 'views/io-article-preview.html'));

  var element, $httpBackend, $compile, $rootScope, spinner;

  beforeEach(inject(function ($injector, _$compile_, _$rootScope_) {
    $httpBackend = $injector.get('$httpBackend');
    $httpBackend.when('GET', 'views/io-article-preview.html').respond('<div ng-repeat="article in articles" class="article"><h2 ng-bind="article.title"></h2><p ng-bind="article.preview"></p></div>');

    $compile  = _$compile_;
    $rootScope = _$rootScope_;

    // $rootScope.articles = ['1', '2']
  }));

  it('include the proper template', function () {
    element = $compile('<span io-article-preview></span>')($rootScope);
    $rootScope.$digest();
    expect(element.html()).toContain('<!--io-article-preview.html-->');
  });

  it('should show a spinner while there are no articles on the scope', function () {
    spinner = element.find('div');
    
    expect(spinner.css('display')).toEqual('');
    expect(spinner.hasClass('spinner')).toBe(true);
  });
});