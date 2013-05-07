'use strict';

describe('Service: Articles', function () {
  var $httpBackend, scope, Articles;
  beforeEach(module('ngswipeDemoApp'));
  beforeEach(inject(function ($injector, $rootScope) {
    

    $httpBackend = $injector.get('$httpBackend');
    Articles = $injector.get('Articles');

    $httpBackend.whenJSONP(dailyFeedUrl).respond(dailyJSFeed);
    $httpBackend.whenJSONP(angularFeedUrl).respond({error: 'feed does not exist'}, {status: 404});

    scope = $rootScope;
  }));

  it('should return a promise for loading a feed', function () {
    var responseData;

    Articles.fetch('http%3A%2F%2Fdailyjs.com%2Fatom.xml', 'feed.entry').then(function (res) {
      responseData = res.data;
    });

    $httpBackend.flush();
    scope.$digest();
    
    expect(responseData).toBeDefined();
  });

  it('should make a truncated plaintext preview of the content', function () {
    var normalizedAtom = Articles.normalize(atomArticle, 'atom');
    expect(!!normalizedAtom.preview).toBe(true);
    expect(normalizedAtom.preview).not.toContain('<img');
    expect(normalizedAtom.preview.split(' ').length).toBeLessThan(50);
  });
});