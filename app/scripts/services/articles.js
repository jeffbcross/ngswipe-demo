'use strict';

angular.module('ngswipeDemoApp')
  .factory('articles', ['$q', '$http', function ($q, $http) {
    return {
      formatters: {
        atom: function (input) {
          var output = {};
          
          output.content = input.content.content;
          output.contentType = input.content.type;
          output.id = input.id;
          output.link = input.link.href;
          output.title = input.title.content;
          output.updated = input.updated;

          return output;
        }
      },
      fetch: function (feedUrl, pathToItems) {
        var url = "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20xml%20where%20url%3D'%feedUrl'%20and%20itemPath%3D'%itemPath'&format=json&diagnostics=true&callback=JSON_CALLBACK";
        url = url.replace("%itemPath", pathToItems);
        url = url.replace("%feedUrl", feedUrl);

        return $http.jsonp(url);
      },
      /*
      Returns an array of entries. 
      */
      getEntries: function (res) {
        var containsFeed;

        if (!res || !res.data || !res.data.query || !res.data.query.results) return [];
        containsFeed = res.data.query.results.feed ? true : false;

        return containsFeed ? res.data.query.results.feed.entry : res.data.query.results.entry;
      },
      normalize: function (item, inputFormat) {
        if (typeof item !== "object") {
          return;
        }
        if (!inputFormat || !this.formatters.hasOwnProperty(inputFormat)) {
          //assume it's atom
          return this.formatters['atom'](item);
        }
        else {
          return this.formatters[inputFormat](item);
        }
      }
    };
  }]);
