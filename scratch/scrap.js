// request(listingsUrl, function(error, response, body) {
//   if (!error && response.statusCode === 200) {
//     for (i=0; i < 150; i++){
//     listSymbols.symbol.push(JSON.parse(body).data[i].symbol)
//     listSymbols.id.push(JSON.parse(body).data[i].id)
//     };
//   };
// res.json(listSymbols)
// console.log(listSymbols);


  

  // app.post("/api/clear", function() {
  //   // Empty out the arrays of data
  //   tableData = [];
  //   waitListData = [];

  //   console.log(tableData);
  // });
// };


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
