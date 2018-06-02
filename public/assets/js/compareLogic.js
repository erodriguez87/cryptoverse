$(document).ready(function(){
  $('select').formSelect();
  $(".compareBtn").on("click", function(event) {
    let coin = $(this).attr("id"); 
    getCompare(coin);

  });

  function getCompare(coin) {
    $.get("/api/compare/" + coin + '/' + coin2, function(coin) {
      // $("#name1").html(`${coin.name} (${coin.cryptoId})`); 
      console.log(coin);
    }); 
   
  };

});