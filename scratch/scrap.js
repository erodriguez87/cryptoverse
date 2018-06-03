const request = require("request");
listSymbols = {
  id:[],
  symbol:[]
}
request("https://api.coinmarketcap.com/v2/listings/", function(error, response, body) {
  if (!error && response.statusCode === 200) {
    for (i=900; i < 1000; i++){
    listSymbols.symbol.push(JSON.parse(body).data[i].symbol)
    listSymbols.id.push(JSON.parse(body).data[i].id)
    };
  };
  console.log(listSymbols);
});
// res.json(listSymbols)

// //global api to get data for the whole market. This includes the total value
  
//   let globalURL = `https://api.coinmarketcap.com/v2/global/`;
//   request(globalURL, function(error, response, body) {
//     // If the request is successful
//     if (!error && response.statusCode === 200) {
//       console.log("global return: " + JSON.parse(body));
//     }
//   });
