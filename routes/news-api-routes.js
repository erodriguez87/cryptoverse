const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('4f9397d3c24942eb92519616eedfbc23');

newsapi.v2.everything({
  q: 'cryptocurrency',
  sources: 'bbc-news,the-verge',
  domains: 'bbc.co.uk, techcrunch.com',
  language: 'en',
  sortBy: 'publishedAt',
  page: 2
}).then(response => {
  console.log(response);
  $("#news-api-body").text(JSON.stringify(response));
  /*
    {
      status: "ok",
      articles: [...]
    }
  */
});
