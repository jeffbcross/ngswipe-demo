'use strict';

angular.module('ngswipeDemoApp')
  .factory('Articles', ['$q', '$http', '$window', function ($q, $http, $window) {
    var selected;

    return {
      _cache: {},
      //Take a deep JSON response and make it flatter
      parseResponse: function (res) {
        var feed = {entries: [], meta: {}}, entries;
        
        feed.entries = res.data.query.results.feed.entry;
        feed.meta.title = res.data.query.results.feed.title.content;
        
        var links = res.data.query.results.feed.link;
        feed.meta.href = links[0].href;

        angular.forEach(feed.entries, function (entry) {
          if (entry.title && entry.title.content) {
            entry.title = entry.title.content;
          }
        });

        //We want to get the link to the original source, not to a feed.
        for (var i = 0; i < links.length; i++) {
          if (links[i].type && links[i].type.indexOf('text/html') === 0) {
            feed.meta.href = links[i].href;
            break;
          }
        }

        return feed;
        
      },
      fetch: function (feedUrl) {
        if (this._cache[feedUrl]) return this._cache[feedUrl];

        if (feedUrl.indexOf('http://') === 0) {
          feedUrl = $window.encodeURIComponent(feedUrl);
        }
        
        var deferred = $q.defer()
          , self = this;
        var url = "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20xml%20where%20url%3D'%feedUrl'%20and%20itemPath%3D'feed'%20limit%2010&format=json&diagnostics=true&callback=JSON_CALLBACK";

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
