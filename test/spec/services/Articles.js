'use strict';

describe('Service: Articles', function () {
  var httpMock, scope, Articles;
  
  beforeEach(module('ngswipeDemoApp'));
  beforeEach(inject(function ($injector, $rootScope, $httpBackend) {
    httpMock = $httpBackend;
    Articles = $injector.get('Articles');

    httpMock.whenJSONP(dailyFeedUrl).respond(dailyJSFeed);
    httpMock.whenJSONP(angularFeedUrl).respond(angularJSFeed);
    httpMock.whenJSONP("http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20xml%20where%20url%3D'http%3A%2F%2Fdailyjs.com%2Fatom.xml'%20and%20itemPath%3D'feed.entry'%20limit%2010&format=json&diagnostics=true&callback=JSON_CALLBACK").respond(dailyJSFeed);

    scope = $rootScope;
  }));

  it('should return a promise for loading a feed', function () {
    var promise;

    promise = Articles.fetch('http%3A%2F%2Fdailyjs.com%2Fatom.xml');
    
    expect(typeof promise['then']).toEqual('function');
  });

  it('should allow setting and getting the selected article by id', function () {
    Articles.setSelected('the-unique-id');
    expect(Articles.getSelected()).toEqual('the-unique-id');
  });

  it('should cache loaded articles, indexed by url-encoded feed url', function () {
    var promise = Articles.fetch('http%3A%2F%2Fdailyjs.com%2Fatom.xml');
    scope.$digest();
    httpMock.flush();
    
    expect(Articles._cache['http%3A%2F%2Fdailyjs.com%2Fatom.xml']).toBeDefined();
    
  })
});