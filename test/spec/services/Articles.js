'use strict';

describe('Service: Article Loader', function () {
  var httpMock, scope, Articles;
  
  beforeEach(module('ngswipeDemoApp'));
  beforeEach(inject(function ($injector, $rootScope, $httpBackend) {
    httpMock = $httpBackend;
    Articles = $injector.get('Articles');

    httpMock.whenJSONP(dailyFeedUrl).respond(dailyJSFeed);
    httpMock.whenJSONP(angularFeedUrl).respond(angularJSFeed);

    scope = $rootScope;
  }));

  it('should return a promise for loading a feed', function () {
    var promise;

    promise = Articles.fetch('http%3A%2F%2Fdailyjs.com%2Fatom.xml');
    
    expect(typeof promise['then']).toEqual('function');
  });

  it('should give articles a preview property with a plaintext preview of the article', function () {
    var responseData;
    
    Articles.fetch('http%3A%2F%2Fdailyjs.com%2Fatom.xml')
      .then(function success (feed) {
        responseData = feed;
      });

    scope.$digest();
    httpMock.flush();

    expect(responseData).toBeDefined();
  });

  it('should allow setting and getting the selected article by id', function () {
    Articles.setSelected('the-unique-id');
    expect(Articles.getSelected()).toEqual('the-unique-id');
  });
});