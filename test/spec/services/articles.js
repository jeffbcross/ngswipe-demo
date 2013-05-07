'use strict';

describe('Service: articles', function () {
  var articles, $httpBackend, scope;


  beforeEach(inject(function (_articles_, $injector, $rootScope) {
    module('ngswipeDemoApp')
    $httpBackend = $injector.get('$httpBackend');

    $httpBackend.whenJSONP(dailyFeedUrl).respond(dailyJSFeed);
    $httpBackend.whenJSONP(angularFeedUrl).respond({error: 'feed does not exist'}, {status: 404});
    
    articles = _articles_;

    scope = $rootScope;
  }));

  it('should return a promise for loading a feed', function () {
    var responseData;

    articles.fetch('http%3A%2F%2Fdailyjs.com%2Fatom.xml', 'feed').then(function (res) {
      responseData = res.data;
    });

    $httpBackend.flush();
    scope.$digest();
    
    expect(responseData.foo).toBeDefined();
  });

  it('should change the query for different URLs passed in', function () {
    var responseData;

    articles.fetch(encodeURIComponent('http://feeds.mashable.com/Mashable'), 'feed').then(function (res) {
      responseData = res.data;
    });

    $httpBackend.flush();
    scope.$digest();

    expect(responseData.foo).toBeDefined();
  });

  it('should make a truncated plaintext preview of the content', function () {
    var normalizedAtom = articles.normalize(atomArticle, 'atom');
    expect(!!normalizedAtom.preview).toBe(true);
    expect(normalizedAtom.preview).not.toContain('<img');
    expect(normalizedAtom.preview.split(' ').length).toBeLessThan(50);
  })

  describe('Normalizing', function () {
    it('should normalize articles from different feeds into a consumable format', function () {
      var normalizedAtom = articles.normalize(atomArticle, 'atom');
      expect(Object.keys(normalizedAtom).sort()).toEqual(['content', 'contentType', 'id', 'link', 'title', 'updated'])
    });

    it('should normalize an item as atom if no inputFormat is provided', function () {
      var normalizedAtom = articles.normalize(atomArticle);
      expect(Object.keys(normalizedAtom).sort()).toEqual(['content', 'contentType', 'id', 'link', 'title', 'updated'])
    });

    it('should return an array of raw entries when passing a raw YQL response into getEntries', function () {
      expect(articles.getEntries(dailyJSFeed)[0].id).toEqual('http://hello');
    });
  });
});