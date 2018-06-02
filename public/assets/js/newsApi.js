function getNews(){

var currentURL = window.location.origin;

$.ajax({url: currentURL + "/api/news", method: "GET"})
  .then(function(response){
    console.log("before the loop");
    console.log(response);
    for (var i = 0; i < response.articles.length -15; i++) {
      console.log("inside loop");
      var newCard = $('<div class ="card transparent">')
      var newDiv = $('<div class="card-content white-text">');
      var newTitle = $(`<span id="articles.title">${response.articles[i].title}</span>`);
      var newURL = $(`<span id="articles.url">${response.articles[i].url}</span>`);
      newDiv.append(newTitle);
      newDiv.append(newURL);
      newCard.append(newDiv);
      $(".newsInfo").append(newCard);

  };
})
}

getNews();


// let newsDiv = $(".newsInfo");
// let newsArray = array.forEach(element => {
//   console.log(response);
//   $("#title").html(`${response.name}`); 
//   $("#url").html(`${response.url}`); 

// function getData(coin) {
//   $.get("/api/learn/" + coin, function(coin) {
//     // console.log(coin.name); 
//     let infoDiv  = $(".coinInfo"); 
//   $("#name").html(`${coin.name} (${coin.cryptoId})`); 
//   $("#features").html(coin.features); 