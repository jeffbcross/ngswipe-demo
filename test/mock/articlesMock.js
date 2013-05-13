angular.module('ngswipeDemoApp')
  .factory('ArticlesMock', function ($q, Articles) {
    var selected;
    return {
      fetch: function () {
        return {
          entries: angularJSFeed.query.results.entry
        }
      },
      setSelected: function (name) {
        selected = name;
      }
    }
  });