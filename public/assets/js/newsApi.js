function getNews(){

var currentURL = window.location.origin;

$.ajax({url: currentURL + "/api/news", method: "GET"})
  .then(function(response){
    // console.log(response);
    for (var i = 0; i < response.articles.length -15; i++) {
      var newCard = $('<li>');
      var newBackground = $(`<img id="articles.urlToImage" src="${response.articles[i].urlToImage}">`);
      var newDiv = $('<div class="caption left-align">');
      var newDate = $(`<h4 id="articles.publishedAt" class="black-text">${response.articles[i].publishedAt}</h4><br></span>`)
      var newTitle = $(`<h2 id="articles.title">${response.articles[i].title}</h2><br></span>`);
      var newURL = $(`<a id="articles.url" href="${response.articles[i].url}">READ MORE</a></h4></span>`);
      newDiv.append(newDate, newBackground, newTitle, newURL); 
      // newCard.append(newDiv);
      $(".newsSlides").append(newCard);
      console.log("NEW CARD", newCard);
  };
})
}



getNews();
      