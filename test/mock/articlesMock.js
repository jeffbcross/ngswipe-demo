angular.module('ngswipeDemoApp')
  .factory('ArticlesMock', function ($q, Articles) {
    return {
      fetch: function () {
        return {
          then: function (callback) {
            var parsed = Articles.parseResponse({data: angularJSFeed});
            
            callback(parsed);
          }
        }
        
      }
    }
  });