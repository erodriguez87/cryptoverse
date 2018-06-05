$(document).ready(function(){
  $('select').formSelect();
  $("#compareBtn").on("click", function(event) {
    let coin1 = $("#coinOption1").val();
    let coin2 = $("#coinOption2").val();
    getCompare(coin1,coin2);


  });
  // calls the api route that compares two coins. this will go through the coinmarket cap api and parse results for the two user selected coins then put the response on the html page. It also calls the column chart creator. This will pass the same information that was posted to HTML back to the chart creator and it generates a comparison bar graph on the front end
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

      let coin1Symbol = coin[0].symbol
      let coin1_7d = parseFloat(coin[0].chg7d);
      let coin1_24h = parseFloat(coin[0].chg24H);
      let coin1_1h = parseFloat(coin[0].chg1H);

      let coin2Symbol = coin[1].symbol
      let coin2_7d = parseFloat(coin[1].chg7d);
      let coin2_24h = parseFloat(coin[1].chg24H);
      let coin2_1h = parseFloat(coin[1].chg1H);

      let darray1 = [coin1Symbol + "-7 Days",coin1_7d];
      let darray2 = [coin2Symbol + "-7 Days",coin2_7d];
      let darray3 = [coin1Symbol + "-1 Day",coin1_24h];
      let darray4 = [coin2Symbol + "-1 Day",coin2_24h];
      let darray5 = [coin1Symbol + "1 Hour",coin1_1h];
      let darray6 = [coin2Symbol + "1 Hour",coin2_1h];

      let data = [];
      data[0] = darray1;
      data[1] = darray2;
      data[2] = darray3;
      data[3] = darray4;
      data[4] = darray5;
      data[5] = darray6;
 
      createCompareChart(data);
    }); 
    
   
  };

});