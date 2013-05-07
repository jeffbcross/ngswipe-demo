var angularJSFeed = {
  query: {
    results:{
      entry: [
        {
          content: {
            title: "Angular",
            content: "Hello!"
          }
        }
      ],
      author: {
        name: 'AngularJS'
      },
      link: [{},{
        href: 'http://dailyjs.com/feed.xml'
      }]
    }
  }
};

var angularFeedUrl = "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20xml%20where%20url%3D'http%3A%2F%2Fwww.blogger.com%2Ffeeds%2F7159470537406093899%2Fposts%2Fdefault'%20and%20itemPath%3D'feed.entry'&format=json&diagnostics=true&callback=JSON_CALLBACK";