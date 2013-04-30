'use strict';

angular.module('ngswipeDemoApp')
  .controller('MainCtrl', function ($scope, $http, $sanitize, feed) {
    feed.fetch('http%3A%2F%2Fdailyjs.com%2Fatom.xml', 'feed.entry').then(function (data) {
      var newPages = [];

      for (var i=0; i<data.query.results.entry.length; i++) {
        newPages.push({
          id: i + 1,
          content: data.query.results.entry[i].content.content
        });
      }
      $scope.pages = newPages;

      $scope.feed = {
        url: data.query.diagnostics.url,
        title: data.query.diagnostics.url.content
      }
    });

    $scope.pages = [];
    $scope.feed = {title: "Loading..."};
  });
