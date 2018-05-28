// Include the request npm package (Don't forget to run "npm install request" in this folder first!)
  let request = require("request");
  let validCoinIds = [];
// Request to Coinmarketcap to get all the listings. this will return all active cryptos in one call. We can use body.symbol to get back the coin ID like LTC/BTC. This is only somewhat useful to us. Ticker is the better option.
  function allListings(){
    let listingsUrl = "https://api.coinmarketcap.com/v2/listings/";
    request(listingsUrl, function(error, response, body) {
      // If the request is successful
      if (!error && response.statusCode === 200) {
        for (i=0; i < 200; i++){
        // console.log("Name: " + JSON.parse(body).data[i].name)
        // console.log('Symbol: ' + JSON.parse(body).data[i].symbol)
        validCoinIds.push(JSON.parse(body).data[i].id)
        };
      };
    });
  };

  

// Request to Coinmarketcap to get the top 100 cryptos. This call includes price, price, volume, percent change in the last 1h, 24h, 7d... Api call is limited to 100 returns. This gives back the first 100

  function tickerCoins(){
    // look at https://coinmarketcap.com/api/ for examples
    allListings();

    let tickerUrl = "https://api.coinmarketcap.com/v2/ticker/?limit=100&sort=id";
    request(tickerUrl, function(error, response, body) {
      // If the request is successful
      
      if (!error && response.statusCode === 200) {
        for (i=0; i< 1; i++){
          console.log("Name: " + JSON.parse(body).data[validCoinIds[i]].name);
          console.log("Sumbol: " + JSON.parse(body).data[validCoinIds[i]].symbol);
          console.log('Max Supply: ' + JSON.parse(body).data[validCoinIds[i]].max_supply)
          console.log("Price: " + JSON.parse(body).data[validCoinIds[i]].quotes.USD.price)
          console.log("Change 1h: " + JSON.parse(body).data[validCoinIds[i]].quotes.USD.percent_change_1h)
          console.log("Change 24h: " + JSON.parse(body).data[validCoinIds[i]].quotes.USD.percent_change_24h)
          console.log("Change 7d: " + JSON.parse(body).data[validCoinIds[i]].quotes.USD.percent_change_7d)
        };
      }
    });
    //useful returns to tag on to body ... price, volume_24h, market_cap, percent_change_1h, 24h, 7d
  };

  tickerCoins();

  // // The second call gives the second 100 if we need it
  // let tickerUrl2 = "https://api.coinmarketcap.com/v2/ticker/?start=101&limit=200&sort=volume_24h";
  // request(tickerUrl2, function(error, response, body) {
  //   // If the request is successful
  //   if (!error && response.statusCode === 200) {
  //     console.log("Ticker Part 2: " + JSON.parse(body));
  //   }
  // });
  
// Get request for to look up one speecific coin
  let chosenCoin = "1" // need to pass the id of the coin we want to search for into this variable. this is the number and not 3 letter code
  let specificCoinUrl = `https://api.coinmarketcap.com/v2/ticker/${chosenCoin}/`;

  request(specificCoinUrl, function(error, response, body) {
    // If the request is successful
    if (!error && response.statusCode === 200) {
      console.log("specific cryptos: " + JSON.parse(body));
    }
  });

//global api to get data for the whole market. This includes the total value
  
  let globalURL = `https://api.coinmarketcap.com/v2/global/`;
  request(globalURL, function(error, response, body) {
    // If the request is successful
    if (!error && response.statusCode === 200) {
      console.log("global return: " + JSON.parse(body));
    }
  });

