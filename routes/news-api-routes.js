const NewsAPI = require('newsapi');
const newsAPIkey = process.env.newsAPIkey; 
const NEWS_APIkey = new NewsAPI('4f9397d3c24942eb92519616eedfbc23');

  module.exports = function(app) {
    var newsRes; 
    // console.log('inside news API');

    app.get('/api/news', function(req, res){
      newsapi.v2.everything({
        sources: 'crypto-coins-news',
        language: 'en',
        sortBy: 'publishedAt',
        page: 2
      }).then(newsRes => {
        res.json(newsRes);
        // console.log(newsRes);
      });
    });
  }
