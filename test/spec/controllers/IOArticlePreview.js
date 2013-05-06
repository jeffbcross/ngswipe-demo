'use strict';

describe('Controller: IOArticlePreviewCtrl', function () {

  // load the controller's module
  beforeEach(module('ngswipeDemoApp'));

  var IOArticlePreviewCtrl,
    scope,
    $httpBackend,
    location,
    articles;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $injector, $location) {
    $httpBackend = $injector.get('$httpBackend');

    scope = $rootScope.$new();
    IOArticlePreviewCtrl = $controller('IOArticlePreviewCtrl', {
      $scope: scope,
      $httpBackend: $httpBackend
    });

    location = $location;

    $httpBackend.whenJSONP("http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20xml%20where%20url%3D'http%3A%2F%2Fdailyjs.com%2Fatom.xml'%20and%20itemPath%3D'feed.entry'&format=json&diagnostics=true&callback=JSON_CALLBACK")
      .respond(dailyJSFeed);
    
    $httpBackend.whenJSONP("http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20xml%20where%20url%3D'http%3A%2F%2Fwww.blogger.com%2Ffeeds%2F7159470537406093899%2Fposts%2Fdefault'%20and%20itemPath%3D'feed.entry'&format=json&diagnostics=true&callback=JSON_CALLBACK")
    .respond(angularJSFeed)

    scope.feed = function () {
      return {name: 'DailyJS', href: 'http://dailyjs.com/atom.xml'}
    }

    scope.activeFeed = 'DailyJS';

    scope.loadArticles(scope.activeFeed).then(function (data) {
      articles = data.data.query.results.feed.entry;
    });

    $httpBackend.flush();
    scope.$digest();
  }));

  describe('Article Loading', function () {
    it('should load articles from a service to display to the user', function () {
      waitsFor(function () {
        return typeof articles !== "undefined";
      }, "articles to be defined", 250);
      
      runs(function () {
        expect(articles.length).toBeGreaterThan(0);
      })
    });

    it('should put the articles in a list on the scope after calling bootstrapArticles()', function () {
      scope.articles = [];
      scope.bootstrapArticles();
      
      scope.$digest();
      $httpBackend.flush();

      waitsFor(function () {
        return articles.length > 0;
      }, "articles length to be greater than 0", 250);

      runs(function () {
        expect(scope.articles.length).toBeGreaterThan(0);
      });
    });

    it('should clear the articles from the scope when loading new articles', function () {
      scope.loadArticles('Foobar');
      expect(scope.articles.length).toBe(0);
    });

    it('should load new articles when the activeFeed property changes', function () {
      scope.activeFeed = "AngularJS";
      
      scope.$digest();

      expect(scope.articles[0].title).toEqual('Angular');
    });

    it('should load new articles when reloadArticles method is called', function () {
      scope.loading = false;
      scope.reloadArticles();
      expect(scope.loading).toBe(true);
    });

    it('should change the route to show an article detail when calling showArticle', function () {
      scope.showArticle('http://hello-article');
      expect(location.url()).toContain('hello-article');
    });

    it('should update the scope with an error message when articles cannot be loaded', function () {
      expect(false).toBe(true);
    });
    
  });

  var dailyJSFeed = JSON.stringify({
    query: {
      results:{
        feed: {
          entry: [
            {
              id: 'http://hello',
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

  var angularJSFeed = JSON.stringify({
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
