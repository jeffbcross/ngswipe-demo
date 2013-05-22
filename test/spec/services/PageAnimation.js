'use strict';

describe('Service: PageAnimation', function () {

  // load the service's module
  beforeEach(module('ngswipeDemoApp'));

  // instantiate service
  var PageAnimation;
  beforeEach(inject(function (_PageAnimation_) {
    PageAnimation = _PageAnimation_;
  }));

  describe('enter', function () {
    it('should return an empty string when called without any controllers in history', function () {
      expect(PageAnimation.enter()).toEqual('');
      expect(PageAnimation.leave()).toEqual('');
    });

    it('should return page-enter-right when called if ArticleDetailCtrl is the (old) active controller', function () {
      //TODO: Add in history service
      expect(PageAnimation.enter()).toEqual('page-enter-right');
    });

    it('should return page-enter-left when called if FeedListCtrl is the (old) active controller', function () {
      expect(PageAnimation.enter()).toEqual('page-enter-left');
    });
  });

  

});
