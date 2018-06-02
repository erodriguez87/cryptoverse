
function getNews(){
var currentURL = window.location.origin;

$.ajax({url: currentURL + "/api/news", method: "GET"})
.then(function(response){
  console.log("URL: " + currentURL + "/api/news");
  // console.log(response);
})
};

getNews();


var newsData = {
  Title: title,
  URL: url
}

var newsTitle = $('<td class="newsTitle">').text(title);
var newsURL = $('<td class="newsURL">').text(url)