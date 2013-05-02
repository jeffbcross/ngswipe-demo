'use strict';

describe('Controller: ArticleDetailCtrl', function () {
  var dailyJSFeed;

  // load the controller's module
  beforeEach(module('ngswipeDemoApp'));

  var MainCtrl, ArticleDetailCtrl, scope, $httpBackend, feeds;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $injector) {
    scope = $rootScope.$new();
    
    $httpBackend = $injector.get('$httpBackend');
    
    $httpBackend.whenJSONP("http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20xml%20where%20url%3D'http%3A%2F%2Fdailyjs.com%2Fatom.xml'%20and%20itemPath%3D'feed'&format=json&diagnostics=true&callback=JSON_CALLBACK").respond(dailyJSFeed);

    ArticleDetailCtrl = $controller('ArticleDetailCtrl', {
      $scope: scope
    });

    

    console.log('ArticleDetailCtrl', ArticleDetailCtrl);
  }));

  it('should provide some pages', function () {
    $httpBackend.flush()
    scope.$digest();

    waitsFor(function () {
      return scope.pages.length > 0;
    }, "pages to load", 250);

    runs(function () {
      expect(scope.pages.length).toBeGreaterThan(0);  
    })
  });

  dailyJSFeed = JSON.stringify({
    query: {
      results:{
        feed: {
          entry: [
            {
              content: {
                content: "Hello!"
              }
            }
          ],
          author: {
            name: 'DailyJS'
          },
          link: [{},{
            href: 'http://dailyjs.com/feed.xml'
          }]
        }
      }
    }
  })
});
