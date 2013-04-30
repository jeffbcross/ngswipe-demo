'use strict';

describe('Service: feed', function () {

  // load the service's module
  beforeEach(module('ngswipeDemoApp'));

  // instantiate service
  var feed;
  beforeEach(inject(function (_feed_) {
    feed = _feed_;
  }));

  it('should return a promise for loading a feed', function (done) {
    feed.fetch('http://feeds.mashable.com/Mashable').then(function (data) {
      expect(data.query).to.exist();
    });
  });

});
