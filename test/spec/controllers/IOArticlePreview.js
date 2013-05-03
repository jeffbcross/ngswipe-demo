'use strict';

describe('Controller: IOArticlePreviewCtrl', function () {

  // load the controller's module
  beforeEach(module('ngswipeDemoApp'));

  var IOArticlePreviewCtrl,
    scope,
    $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $injector) {
    $httpBackend = $injector.get('$httpBackend');

    scope = $rootScope.$new();
    IOArticlePreviewCtrl = $controller('IOArticlePreviewCtrl', {
      $scope: scope,
      $httpBackend: $httpBackend
    });

    $httpBackend.whenJSONP("http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20xml%20where%20url%3D'http://dailyjs.com/atom.xml'%20and%20itemPath%3D'undefined'&format=json&diagnostics=true&callback=JSON_CALLBACK")

      .respond(dailyJSFeed);

    scope.feed = function () {
      return {name: 'DailyJS', href: 'http://dailyjs.com/atom.xml'}
    }

    scope.activeFeed = {name: 'DailyJS', href: 'http://dailyjs.com/atom.xml'};
  }));

  describe('Article Loading', function () {
    it('should load articles from a service to display to the user', function () {
      var promise = scope.loadArticles(scope.feed())
        , articles;

      promise.then(function (data) {
        articles = data;
      });

      $httpBackend.flush();
      scope.$digest();

      waitsFor(function () {
        return typeof articles !== "undefined";
      }, "articles to be defined", 250);
      runs(function () {
        expect(articles.data.query.results.feed.entry.length).toBeGreaterThan(0);  
      })
      
      
    });
  })

  var dailyJSFeed = JSON.stringify({
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
