'use strict';

describe('Directive: ioArticlePreview', function () {
  beforeEach(module('ngswipeDemoApp', 'views/ioArticlePreview.html'));

  var element, $httpBackend, $compile, $rootScope, spinner, $location, $scope;

  beforeEach(inject(function ($injector, _$compile_, _$rootScope_, _$httpBackend_, _$location_) {
    $httpBackend = _$httpBackend_;
    $httpBackend.whenJSONP(angularFeedUrl).respond(angularJSFeed);

    $compile  = _$compile_;
    $rootScope = _$rootScope_;
    $location = _$location_;

    $scope = $rootScope.$new();
    $scope.feed = {
      entries: [{
        title: 'Article Title',
        preview: 'Article preview',
        updated: 1369158736780
      }]
    }
    element = $compile('<io-article-preview></io-article-preview>')($scope);
  }));

  it('should include the proper template', function () {
    $scope.$digest();

    expect(element.html()).toContain('<!--io-article-preview.html-->');
  });
});