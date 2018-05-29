$(document).ready(function(){

  $(".coinBtns").on("click", function(event) {
    let coin = $(this).attr("id"); 
    console.log(coin);
    getData(coin); 
    


    
    // switch(coin) {  
    //   case "ada":
    //     console.log('Cardano'); 
    //     break;
    //   case "bat":
    //     console.log('Basic Attention Token'); 
    //     break;
    //   case "btc":
    //     console.log('Bitcoin'); 
    //     break;
    //   case "doge":
    //     console.log('Dogecoin'); 
    //     break;
    //   case "eth":
    //     console.log('Ethereum');  
    //     break;
    //   case "ltc":
    //     console.log('Litecoin');  
    //     break;
    //   case "trx":
    //     console.log('TronCoin'); 
    //     break;
    //   case "ven":
    //     console.log('VeChain');  
    //     break;
    //   case "xlm":
    //     console.log('Stellar');  
    //     break;
    //   case "xrp":
    //     console.log('Ripple');  
    //     break;
    //   default:
    //       code 
    // }

  });

  function getData(coin) {
    $.get("/api/learn/" + coin, function(data) {
      console.log(data.name); 

    }); 
    // $.ajax({
    //   method: "GET",
    //   url: "/api/learn/" + coin
    // }).then(function(data) {
    // });
  };


});