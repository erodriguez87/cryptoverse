function getNews(){

var currentURL = window.location.origin;

$.ajax({url: currentURL + "/api/news", method: "GET"})
  .then(function(response){
    // console.log(response);
    for (var i = 0; i < response.articles.length -15; i++) {
      var newCard = $('<li>');
      var newBackground = $(`<span id="articles.urlToImage"><img src="${response.articles[i].urlToImage}>`);
      var newDiv = $('<div class="caption left-align">');
      var newDate = $(`<span id="articles.publishedAt"><h4 class="black-text">${response.articles[i].publishedAt}</h4><br></span>`)
      var newTitle = $(`<span id="articles.title"><h2>${response.articles[i].title}</h2><br></span>`);
      var newURL = $(`<span id="articles.url"><h4><a href="${response.articles[i].url}">READ MORE</a></h4></span>`);
      newDiv.append(newDate); 
      newDiv.append(newTitle);
      newDiv.append(newURL);
      newCard.append(newBackground);
      newCard.append(newDiv);
      $(".slides").append(newCard);
      console.log("NEW CARD", newCard);
  };
})
}

getNews();
      