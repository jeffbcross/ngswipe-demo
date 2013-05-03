'use strict';

describe('Service: articles', function () {

  // load the service's module
  beforeEach(module('ngswipeDemoApp'));

  // instantiate service
  var articles
    , $httpBackend
    , scope
    , atomArticle = {
      "title": "LevelDB and Node: Getting Up and Running",
      "link": {
        "href": "http:\/\/dailyjs.com\/2013\/05\/03\/leveldb-and-node-2"
      },
      "updated": "2013-05-03T00:00:00+01:00",
      "id": "http:\/\/dailyjs.com\/2013\/05\/03\/leveldb-and-node-2",
      "content": {
        "type": "html",
        "content": "<p>hi!</p>"
      }
    };;

  beforeEach(inject(function (_articles_, $injector, $rootScope) {
    $httpBackend = $injector.get('$httpBackend');

    $httpBackend.whenJSONP("http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20xml%20where%20url%3D'"+
      "http%3A%2F%2Fdailyjs.com%2Fatom.xml"+
      "'%20and%20itemPath%3D'feed'&format=json&diagnostics=true&callback=JSON_CALLBACK")
      .respond({foo: 'bar'});

    $httpBackend.whenJSONP("http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20xml%20where%20url%3D'"+
        "http%3A%2F%2Ffeeds.mashable.com%2FMashable"+
        "'%20and%20itemPath%3D'feed'&format=json&diagnostics=true&callback=JSON_CALLBACK")
      .respond({foo: 'bar'});

    $httpBackend.whenJSONP("http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20xml%20where%20url%3D'"+
        "http%3A%2F%2Fangularjs.org%2Fsuperheroicfeed"+
        "'%20and%20itemPath%3D'feed'&format=json&diagnostics=true&callback=JSON_CALLBACK")
      .respond({error: 'feed does not exist'}, {status: 404});
    
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

  it('should normalize articles from different feeds into a consumable format', function () {
    var normalizedAtom = articles.normalize(atomArticle, 'atom');
    expect(Object.keys(normalizedAtom).sort()).toEqual(['content', 'contentType', 'id', 'link', 'title', 'updated'])
  });

  it('should normalize an item as atom if no inputFormat is provided', function () {
    var normalizedAtom = articles.normalize(atomArticle);
    expect(Object.keys(normalizedAtom).sort()).toEqual(['content', 'contentType', 'id', 'link', 'title', 'updated'])
  })
});