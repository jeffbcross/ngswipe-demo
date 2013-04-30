'use strict';

angular.module('ngswipeDemoApp')
  .factory('feed', ['$q', '$http', function ($q, $http) {
    return {
      fetch: function (feedUrl, pathToItems) {
        var deferred = $q.defer();
        var url = "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20xml%20where%20url%3D'%feedUrl'%20and%20itemPath%3D'%itemPath'&format=json&diagnostics=true&callback=JSON_CALLBACK";
        url = url.replace("%itemPath", pathToItems);
        url = url.replace("%feedUrl", feedUrl);

        $http.jsonp(url).success(function (data) {
          deferred.resolve(data);
        }).error(function(data, status) {
          deferred.reject(data);
        });

        return deferred.promise;
      }
    };
  }]);
