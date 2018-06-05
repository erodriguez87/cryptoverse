require('dotenv').config();
const NewsAPI = require('newsapi');
const NEWS_APIkey = new NewsAPI(process.env.NEWS_APIkey); 

  module.exports = function(app) {
    var newsRes; 
    // console.log('inside news API');

    app.get('/api/news', function(req, res){
      NEWS_APIkey.v2.everything({
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
