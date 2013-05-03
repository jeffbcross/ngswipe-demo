'use strict';

angular.module('ngswipeDemoApp')
  .factory('articles', ['$q', '$http', function ($q, $http) {
    return {
      fetch: function (feedUrl, pathToItems) {

        var url = "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20xml%20where%20url%3D'%feedUrl'%20and%20itemPath%3D'%itemPath'&format=json&diagnostics=true&callback=JSON_CALLBACK";
        url = url.replace("%itemPath", pathToItems);
        url = url.replace("%feedUrl", feedUrl);

        return $http.jsonp(url);
      }
    };
  }]);
