angular.module('ngswipeDemoApp')
  .factory('ArticlesMock', function ($q) {
    return {
      fetch: function () {
        return {
          then: function (callback) {
            callback.call(this, JSON.parse(angularJSFeed));
          }
        };
      },
      getEntries: function () {

      },
      normalize: function () {

      }  
    }
  });