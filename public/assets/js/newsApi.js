function getNews(){

var currentURL = window.location.origin;

$.ajax({url: currentURL + "/api/news", method: "GET"})
  .then(function(response){
    console.log('inside news api');
    for (var i = 0; i < response.articles.length -15; i++) {
      // console.log('inside news for loop');
      // var newCard = $('<li>');
      // var newBackground = $(`<div id="articles.urlToImage"><img src="${response.articles[i].urlToImage}>`);
      // console.log('this is the url fo rthe image ' + response.articles[i].urlToImage);
      // var newDiv = $('<div class="caption left-align">');
      // var newDate = $(`<div id="articles.publishedAt"><h4 class="black-text">${response.articles[i].publishedAt}</h4><br></div>`)
      // var newTitle = $(`<div id="articles.title"><h2>${response.articles[i].title}</h2><br></div>`);
      // var newURL = $(`<div id="articles.url"><h4><a href="${response.articles[i].url}">READ MORE</a></h4></div>`);
      // newDiv.append(newDate); 
      // newDiv.append(newTitle);
      // newDiv.append(newURL);
      // newCard.append(newBackground);
      // newCard.append(newDiv);
      // $(".slides").append(newCard);
      let imgSrc = 'img'+[i]
      console.log(imgSrc);
      $(`#${imgSrc}`).attr('src',response.articles[i].urlToImage);

      let titleText = 'title' + [i]
      $(`#${titleText}`).append(response.articles[i].title);

      // console.log("NEW CARD", newCard);
  };
})
}

getNews();
      