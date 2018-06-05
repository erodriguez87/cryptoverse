function getNews(){

var currentURL = window.location.origin;

$.ajax({url: currentURL + "/api/news", method: "GET"})
  .then(function(response){
    console.log('inside news api');
    for (var i = 0; i < response.articles.length -15; i++) {

      let imgSrc = 'img'+[i]
      console.log(imgSrc);
      $(`#${imgSrc}`).attr('src',response.articles[i].urlToImage);

      let titleText = 'title' + [i]
      $(`#${titleText}`).append(response.articles[i].title);

      let dateText = 'date' + [i]
      $(`#${dateText}`).append(response.articles[i].publishedAt);

      let linkText = 'url' + [i]
      $(`#${linkText}`).append('<a target="_blank" href="'+(response.articles[i].url)+'">Read More</a>');
  };
})
}



getNews();
      