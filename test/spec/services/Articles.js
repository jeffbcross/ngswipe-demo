'use strict';
/*
describe('Service: Articles', function () {
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

  it('should allow setting and getting the selected article by id', function () {
    Articles.setSelected('the-unique-id');
    expect(Articles.getSelected()).toEqual('the-unique-id');
  });

  it('should cache loaded articles, indexed by url-encoded feed url', function () {
    Articles.fetch('http%3A%2F%2Fdailyjs.com%2Fatom.xml');
    scope.$digest();
    httpMock.flush();
    
    expect(Articles._cache['http%3A%2F%2Fdailyjs.com%2Fatom.xml']).toBeDefined();
  });

  it('should not sanitize html returned from service', function () {
    Articles.fetch('http%3A%2F%2Fdailyjs.com%2Fatom.xml');
    scope.$digest();
    httpMock.flush();

    expect(Articles._cache['http%3A%2F%2Fdailyjs.com%2Fatom.xml'].entries[0].content.content.indexOf('<p>')).toEqual(0);
  })

  it('should convert non-encoded feed urls to encoded', function () {
    Articles.fetch('http://dailyjs.com/atom.xml');
    scope.$digest();
    httpMock.flush();

    expect(Articles._cache['http%3A%2F%2Fdailyjs.com%2Fatom.xml']).toBeDefined();
  });

  it('should provide a feed title and link', function () {
    Articles.fetch('http://dailyjs.com/atom.xml');
    scope.$digest();
    httpMock.flush();

    expect(Articles._cache['http%3A%2F%2Fdailyjs.com%2Fatom.xml'].meta.title).toEqual('DailyJS')
  });

  it('should provide a title string for a feed on the entry object', function () {
    Articles.fetch('http://dailyjs.com/atom.xml');
    scope.$digest();
    httpMock.flush();
    
    expect(typeof Articles._cache['http%3A%2F%2Fdailyjs.com%2Fatom.xml'].entries[0].title).toEqual('string')
  });
});
*/