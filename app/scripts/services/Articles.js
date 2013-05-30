'use strict';

angular.module('ngswipeDemoApp')
  .factory('Articles', ['$q', '$http', '$window', '$filter', function ($q, $http, $window, $filter) {
    return {
      _cache: {},
      //Take a deep JSON response and make it flatter
      parseResponse: function (res) {
        var feed = {entries: [], meta: {}}, preview = $filter('preview');
        
        feed.entries = res.data.query.results.feed.entry;
        feed.meta.title = res.data.query.results.feed.title.content || res.data.query.results.feed.title;
        
        var links = res.data.query.results.feed.link;
        feed.meta.href = links[0].href;

        angular.forEach(feed.entries, function (entry) {
          //URL-encode IDs so they can easily be added to location.
          if ($window.decodeURIComponent(entry.id) === entry.id) {
            entry.id = $window.encodeURIComponent(entry.id);
          }

          //Create a preview version of the content;
          entry.preview = preview(entry.content.content);

          //Title path isn't consistent in feeds. Make it so.
          entry.title = entry.title.content || entry.title;
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
        if (feedUrl.indexOf('http://') === 0) {
          feedUrl = $window.encodeURIComponent(feedUrl);
        }

        if (this._cache[feedUrl]) return this._cache[feedUrl];

        var deferred = $q.defer()
          , self = this;
        var url = 'http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20xml%20where%20url%3D"%feedUrl"%20and%20itemPath%3D"feed"%20limit%2010&format=json&diagnostics=true&callback=JSON_CALLBACK';

        url = url.replace('%feedUrl', feedUrl);

        $http.jsonp(url).then(function (res) {
          
          var parsed = self.parseResponse(res);
          self._cache[feedUrl] = parsed;

          if (parsed) {
            deferred.resolve(parsed);
          }
          else {
            deferred.reject('Badly formed data');
          }
        });

        return deferred.promise;
      }
    };
  }]);
