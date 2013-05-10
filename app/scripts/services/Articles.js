'use strict';

angular.module('ngswipeDemoApp')
  .factory('Articles', ['$q', '$http', '$sanitize', '$window', function ($q, $http, $sanitize, $window) {
    var selected;

    return {
      _cache: {},
      //Take a deep JSON response and make it flatter
      parseResponse: function (res) {
        var feed = {entries: [], meta: {}}, entries;
        
        feed.entries = res.data.query.results.entry;
        
        angular.forEach(feed.entries, function (entry) {
          entry.content.content = $sanitize(entry.content.content);
        });

        // feed.meta.title = res.data.query.results.feed.author.name;
        // feed.meta.href = res.data.query.results.feed.link[1].href;
        return feed;
        
      },
      fetch: function (feedUrl) {
        if (this._cache[feedUrl]) return this._cache[feedUrl];

        if (feedUrl.indexOf('http://') === 0) {
          feedUrl = $window.encodeURIComponent(feedUrl);
        }
        
        var deferred = $q.defer()
          , self = this;
        var url = "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20xml%20where%20url%3D'%feedUrl'%20and%20itemPath%3D'feed.entry'%20limit%2010&format=json&diagnostics=true&callback=JSON_CALLBACK";

        url = url.replace("%feedUrl", feedUrl);

        $http.jsonp(url).then(function (res) {
          
          var parsed = self.parseResponse(res);
          self._cache[feedUrl] = parsed;

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
