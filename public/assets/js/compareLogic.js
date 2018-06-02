$(document).ready(function(){
  $('select').formSelect();
  $(".compareBtn").on("click", function(event) {
    let coin = $(this).attr("id"); 
    // getData(coin); 
    // getCrypto(coin);

  });

  function getData(coin) {
    $.get("/api/compare/" + coin, function(coin) {
      // console.log(coin.name); 
      let infoDiv  = $(".coinInfo"); 
    $("#name1").html(`${coin.name} (${coin.cryptoId})`); 
    }); 
    // $.ajax({
    //   method: "GET",
    //   url: "/api/learn/" + coin
    // }).then(function(data) {
    // });
    
  };

});