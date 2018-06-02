$(document).ready(function(){
  $('select').formSelect();
  console.log('in compare logic')
  $("#compareBtn").on("click", function(event) {
    let coin1 = $("#coinOption1").val();
    let coin2 = $("#coinOption2").val();
    console.log(coin1,coin2);
    getCompare(coin1,coin2);


  });

  function getCompare(coin1,coin2) {
    $.get("/api/compare/" + coin1 + '/' + coin2, function(coin) {
      $("#name1").html(`${coin[0].name}`); 
      $("#price1").html(`$${coin[0].price}`)
      $("#chg1H1").html(`${coin[0].chg1H}%`)
      $("#chg24H1").html(`${coin[0].chg24H}%`)
      $("#chg7d1").html(`${coin[0].chg7d}%`)
      
      $("#name2").html(`${coin[1].name}`); 
      $("#price2").html(`$${coin[1].price}`)
      $("#chg1H2").html(`${coin[1].chg1H}%`)
      $("#chg24H2").html(`${coin[1].chg24H}%`)
      $("#chg7d2").html(`${coin[1].chg7d}%`)

    }); 
   
  };

});