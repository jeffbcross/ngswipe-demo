'use strict';

angular.module('ngswipeDemoApp')
  .factory('Articles', ['$q', '$http', function ($q, $http) {
    var selected;

    return {
      parseResponse: function (res) {
        var feed = {entries: [], meta: {}}, entries;
        
        try {
          feed.entries = res.data.query.results.entry;

          // feed.meta.title = res.data.query.results.feed.author.name;
          // feed.meta.href = res.data.query.results.feed.link[1].href;
          return feed;
        }
        catch (e) {
          return;
        }
      },
      fetch: function (feedUrl, pathToItems) {
        var deferred = $q.defer()
          , self = this;
        var url = "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20xml%20where%20url%3D'%feedUrl'%20and%20itemPath%3D'feed.entry'&format=json&diagnostics=true&callback=JSON_CALLBACK";

        url = url.replace("%feedUrl", feedUrl);
        
        $http.jsonp(url).then(function (res) {
          var parsed = self.parseResponse(res);
          if (parsed) {
            deferred.resolve(parsed);
          }
          else {
            deferred.reject("Badly formed data");
          }
        });

        return deferred.promise;
      },
      setSelected: function (id) {
        selected = id;
      },
      getSelected: function () {
        return selected;
      }
    };
  }]);
