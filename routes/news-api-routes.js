const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('4f9397d3c24942eb92519616eedfbc23');

newsapi.v2.everything({
  q: 'crypto currency',
  sources: 'bbc-news,the-verge',
  domains: 'techcrunch.com, coinbaseapi.com',
  language: 'en',
  sortBy: 'publishedAt',
  page: 2
}).then(response => {
  console.log(response);
  /*
    {
      status: "ok",
      articles: [...]
    }
  */
});
