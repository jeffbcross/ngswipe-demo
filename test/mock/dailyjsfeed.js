var dailyJSFeed = JSON.stringify({
    query: {
      results:{
        entry: [
          {
            id: 'http://hello',
            content: {
              content: "<p>Hello!</p>"
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
  })

var dailyFeedUrl = "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20xml%20where%20url%3D'http%3A%2F%2Fdailyjs.com%2Fatom.xml'%20and%20itemPath%3D'feed.entry'%20limit%2010&format=json&diagnostics=true&callback=JSON_CALLBACK";