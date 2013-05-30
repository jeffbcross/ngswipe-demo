angular.module('ngswipeDemoApp')
  .controller('IOAddFeedFormCtrl', 
    ['$scope', 'FeedManager', 'RecommendedFeeds', '$location', function ($scope, FeedManager, RecommendedFeeds, $location) {
    
    $scope.saveFeed = function () {
      var name = $scope.newFeed.name;
      FeedManager.add(name, $scope.newFeed);

      $scope.newFeedForm = null;

      $location.search({feed: name});
    };

    $scope.sources = RecommendedFeeds;
    
    $scope.$watch('newFeed.name', function (name) {
      if (name && $scope.sources[name]) {
        $scope.newFeed.href = $scope.sources[name].href;
        $scope.newFeed.icon = $scope.sources[name].icon || 'img/rss.png';
      }
    });
  }]);