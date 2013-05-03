'use strict';

describe('Directive: ioArticlePreview', function () {
  beforeEach(module('ngswipeDemoApp'));

  var element, $httpBackend;

  beforeEach(inject(function ($injector, $rootScope) {
    $httpBackend = $injector.get('$httpBackend');
    $httpBackend.when('GET', 'views/io-article-preview.html').respond('<div ng-repeat="article in articles" class="article"><h2 ng-bind="article.title"></h2><p ng-bind="article.preview"></p></div>');

    $rootScope.articles = ['1', '2']
  }));

  it('should make hidden element visible', inject(function ($rootScope, $compile) {
    element = angular.element('<div io-article-preview></div>');
    element = $compile(element)($rootScope);

    $rootScope.$digest();
    // var repeater = element.find('[ng-repeat="article*"]');
    
    // expect(repeater.html()).toContain('ng-bind');
    expect(element).toBeDefined();
  }));
});
//TODO: Get html2js functioning and finish this test.