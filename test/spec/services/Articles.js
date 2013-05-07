'use strict';

describe('Service: Article Loader', function () {
  var $httpBackend, scope, Articles;
  
  beforeEach(module('ngswipeDemoApp'));
  beforeEach(inject(function ($injector, $rootScope) {
    $httpBackend = $injector.get('$httpBackend');
    Articles = $injector.get('Articles');

    $httpBackend.whenJSONP(dailyFeedUrl).respond(dailyJSFeed);
    $httpBackend.whenJSONP(angularFeedUrl).respond(angularJSFeed);

    scope = $rootScope;
  }));

  it('should return a promise for loading a feed', function () {
    var responseData;

    Articles.fetch('http%3A%2F%2Fdailyjs.com%2Fatom.xml').then(function (feed) {
      responseData = feed;
    }, function failure (reason) {
      throw new Error(reason);
    });

    $httpBackend.flush();
    scope.$digest();
    
    expect(responseData.entries).toBeDefined();
    expect(responseData.meta).toBeDefined();
  });

  it('should give articles a preview property with a plaintext preview of the article', function () {
    Articles.fetch('http%3A%2F%2Fdailyjs.com%2Fatom.xml')
      .then(function success (feed) {
        responseData = feed;
      }, function failure (reason) {
        throw new Error(reason);
      });
  })
});