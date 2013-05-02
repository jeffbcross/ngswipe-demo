'use strict';

angular.module('ngswipeDemoApp')
  .controller('ArticleDetailCtrl', function ($scope, $http, $sanitize, feed) {
    feed.fetch('http%3A%2F%2Fdailyjs.com%2Fatom.xml', 'feed').then(function (data) {
      console.log(data);
      var newPages = []
        , entries = data.query.results.feed.entry;


      for (var i=0; i<entries.length; i++) {
        newPages.push(entries[i]);
        newPages[newPages.length - 1].id = i;
      }
      $scope.pages = newPages;

      $scope.feed = {
        url: data.query.results.feed.link[1].href,
        title: data.query.results.feed.author.name
      }
    });

    $scope.pages = [];
    $scope.feed = {title: "Loading..."};
  });