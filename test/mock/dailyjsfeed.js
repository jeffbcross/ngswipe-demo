var dailyJSFeed = JSON.stringify({
    query: {
      results:{
        feed: {
          entry: [
            {
              id: 'http://hello',
              title: {
                content: "Title here!"
              },
              content: {
                content: "<p>Hello!</p>"
              }
            },
            {
              id: 'Article2',
              title: {
                type: "text"
              },
              content: {
                content: "<p>Article 2 content</p>"
              }
            }
          ],
          title: {
            content: 'DailyJS'
          },
          link: [{},{
            href: 'http://dailyjs.com/feed.xml'
          }]
        },
        
      }
    }
  })

var dailyFeedUrl = "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20xml%20where%20url%3D'http%3A%2F%2Fdailyjs.com%2Fatom.xml'%20and%20itemPath%3D'feed'%20limit%2010&format=json&diagnostics=true&callback=JSON_CALLBACK";