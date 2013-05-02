'use strict'; 

angular.module('ngswipeDemoApp')
  .factory('feeds', function (localData) {
    var selected, feeds = [{
      name: 'dailyjs'
    }];
    // Public API here
    return {
      getSelected: function () {
        return localData.get();
      },
      getAll: function () {
        return feeds;
      }
    };
  });
