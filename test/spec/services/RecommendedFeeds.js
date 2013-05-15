'use strict';

describe('Service: RecommendedFeeds', function () {

  // load the service's module
  beforeEach(module('ngswipeDemoApp'));

  // instantiate service
  var RecommendedFeeds;
  beforeEach(inject(function (_RecommendedFeeds_) {
    RecommendedFeeds = _RecommendedFeeds_;
  }));

  it('return a dictionary of feeds', function () {
    expect(RecommendedFeeds['YouTube Blog']).toBeDefined();
  });

});
