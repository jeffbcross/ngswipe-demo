angular.module('ngswipeDemoApp')
  .factory('ArticlesMock', function ($q, Articles) {
    return {
      fetch: function () {
        var deferred = $q.defer();
          
        deferred.resolve(Articles.parseResponse(angularJSFeed));
        
        return deferred.promise;
      }
    }
  });