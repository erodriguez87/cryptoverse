const db = require("../models");
const request = require("request");
// db.###

// Compare.handlebars ==============
  // Calls to external APIs

// home.handlebars =================
  // Calls to external APIs



module.exports = function(app) {
  app.get("/api/learn2", function(req, res) {

    let listSymbols =[];
    let listingsUrl = "https://api.coinmarketcap.com/v2/listings/";
    request(listingsUrl, function(error, response, body) {
      // If the request is successful
      if (!error && response.statusCode === 200) {
        for (i=0; i < 200; i++){
        // console.log("Name: " + JSON.parse(body).data[i].name)
        listSymbols.push(JSON.parse(body).data[i].symbol)
        // push(JSON.parse(body).data[i].id)
        };
      };
    console.log(listSymbols)
    res.json(listSymbols)
    });
    
  });

  app.get("/api/ticker", function(req, res) {
    // Request to Coinmarketcap to get the top 100 cryptos. This call includes price, price, volume, percent change in the last 1h, 24h, 7d... Api call is limited to 100 returns. This gives back the first 100

    function tickerCoins(){
      let tickerUrl = "https://api.coinmarketcap.com/v2/ticker/?limit=100&sort=id";
      request(tickerUrl, function(error, response, body) {
        // If the request is successful
        let tickerArray =[];
        
        function CoinObject(name, symbol, max, price, chg1H, chg24H,chg7d) {
          this.name = name;
          this.symbol = symbol;
          this.max = max;
          this.price = price;
          this.chg1H = chg1H;
          this.chg24H = chg24H;
          this.chg7d = chg7d;
        };

        function canParseJson(str) {
          try {
            JSON.parse(body).data[str].name;
          } catch (e) {
            console.log('error')
            return false;
          }
            // fills the array that we pass to the front with objects
            tickerArray[str] = new CoinObject(JSON.parse(body).data[str].name,JSON.parse(body).data[str].symbol,JSON.parse(body).data[str].max_supply,JSON.parse(body).data[str].quotes.USD.price,JSON.parse(body).data[str].quotes.USD.percent_change_1h,JSON.parse(body).data[str].quotes.USD.percent_change_24h,JSON.parse(body).data[str].quotes.USD.percent_change_7d)
        }

        if (!error && response.statusCode === 200) {
          for (i=0; i< 150 ; i++){
            canParseJson(i);     
          };
        }
        console.log(tickerArray);
        res.json(tickerArray);
      });
  };

  tickerCoins();
  
  });


  app.post("/api/clear", function() {
    // Empty out the arrays of data
    tableData = [];
    waitListData = [];

    console.log(tableData);
  });
};


  // // The second call gives the second 100 if we need it
  // let tickerUrl2 = "https://api.coinmarketcap.com/v2/ticker/?start=101&limit=200&sort=volume_24h";
  // request(tickerUrl2, function(error, response, body) {
  //   // If the request is successful
  //   if (!error && response.statusCode === 200) {
  //     console.log("Ticker Part 2: " + JSON.parse(body));
  //   }
//   // });
  
// // Get request for to look up one speecific coin
//   let chosenCoin = "1" // need to pass the id of the coin we want to search for into this variable. this is the number and not 3 letter code
//   let specificCoinUrl = `https://api.coinmarketcap.com/v2/ticker/${chosenCoin}/`;

//   request(specificCoinUrl, function(error, response, body) {
//     // If the request is successful
//     if (!error && response.statusCode === 200) {
//       console.log("specific cryptos: " + JSON.parse(body));
//     }
//   });

// //global api to get data for the whole market. This includes the total value
  
//   let globalURL = `https://api.coinmarketcap.com/v2/global/`;
//   request(globalURL, function(error, response, body) {
//     // If the request is successful
//     if (!error && response.statusCode === 200) {
//       console.log("global return: " + JSON.parse(body));
//     }
//   });


