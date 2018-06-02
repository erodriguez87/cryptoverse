const db = require("../models");
const request = require("request");

// API call to get specific coin information to the front
  module.exports = function(app) {
    app.get("/api/ticker/:id", function(req, res) {
      let cryptoId = req.params.id
      let cryptoUpper = cryptoId.toUpperCase();
      let specificCoinUrl = "";
      let coinObject ={}; // empty object that api will fill and send back to front end
      
      let coinIndex = listSymbols.symbol.indexOf(cryptoUpper) // need to pass the id of the coin we want to search for into this variable. this is the number and not 3 letter code

      let chosenCoin = listSymbols.id[coinIndex];
      specificCoinUrl = `https://api.coinmarketcap.com/v2/ticker/${chosenCoin}/`;

      console.log('coin url ' + specificCoinUrl);

      request(specificCoinUrl, function(error, response, body) {
        // If the request is successful
        if (!error && response.statusCode === 200) {
          let cap = JSON.parse(body).data.quotes.USD.market_cap;
          coinObject = {
            name: JSON.parse(body).data.name,
            symbol: JSON.parse(body).data.symbol,
            max: JSON.parse(body).data.max_supply,
            price: JSON.parse(body).data.quotes.USD.price,
            cap: JSON.parse(body).data.quotes.USD.market_cap,
            chg1H: JSON.parse(body).data.quotes.USD.percent_change_1h,
            chg24H: JSON.parse(body).data.quotes.USD.percent_change_24h,
            chg7d: JSON.parse(body).data.quotes.USD.percent_change_7d,
            mktCap: cap.toLocaleString('en-US', {style:"decimal",minimumFractionDigits: 2}),
            };
          console.log(coinObject);
          res.json(coinObject);
        };
      });
    });

    app.get("/api/compare/:id/:id2", function(req, res) {
      // Request to Coinmarketcap to get the top 100 cryptos. This call includes price, price, volume, percent change in the last 1h, 24h, 7d... Api call is limited to 100 returns. This gives back the first 100
  
      function tickerCoins(){
        let tickerUrl = "https://api.coinmarketcap.com/v2/ticker/?limit=100&sort=id";
        console.log('inside ticker url')
  
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
          
              tickerArray[str] =new CoinObject(JSON.parse(body).data[str].name,JSON.parse(body).data[str].symbol,JSON.parse(body).data[str].max_supply,JSON.parse(body).data[str].quotes.USD.price,JSON.parse(body).data[str].quotes.USD.percent_change_1h,JSON.parse(body).data[str].quotes.USD.percent_change_24h,JSON.parse(body).data[str].quotes.USD.percent_change_7d)
          }
  
          if (!error && response.statusCode === 200) {
            for (i=0; i< 150 ; i++){
              canParseJson(i);     
            };
          }

          function search(nameKey, tickerArray){
            for (var i=0; i < tickerArray.length; i++) {
                if (tickerArray[i].symbol === nameKey) {
                    return tickerArray[i];
                    console.log(tickerArray[i]);
                }
            }
          }

          search('BTC',tickerArray);

          // console.log(tickerArray);
          res.json(tickerArray);
          //on the front end loop through the array, look up by symbol then return the index
        });
    };
  
    tickerCoins();
    
    });
  };

  let listSymbols = {
    id:
    [ 1,2,3,4,5,6,8,9,10,13,14,16,18,25,31,32,34,35,37,41,42,43,45,49,50,51,52,53,56,57,58,61,63,64,66,67,68,69,70,71,72,74,75,76,77,78,79,80,83,84,87,88,89,90,93,99,101,103,109,113,114,116,117,118,120,121,122,125,128,129,130,131,132,134,135,138,141,142,145,148,150,151,154,159,160,161,164,168,170,174,175,181,182,199,201,205,206,212,213,215],
    symbol:
    ['BTC','LTC','NMC','TRC','PPC','NVC','FTC','MNC','FRC','IXC','BTB','WDC','DGC','GLD','ARG','FST','BTG','PXC','MEC','IFC','XPM','ANC','CSC','CBX','EMD','GLC','XRP','QRK','ZET','SRC','SXC','TAG','I0C','FLO','NXT','UNO','XJO','DTC','BET','GDC','DEM','DOGE','NET','PHS','DMD','HBN','TGC','ORB','OMNI','CAT','TIPS','RPC','MOON','DIME','42','VTC','KDC','RED','DGB','SMC','TES','KARMA','NOBL','RDD','NYAN','UTC','POT','BLC','MAX','Q2C','HUC','DASH','XCP','CACH','TOP','ICN','MINT','ARI','DOPE','AUR','ANI','PTC','MARS','CASH','RIC','PND','MZC','UFO','BLK','LTB','PHO','ZEIT','XMY','SKC','EMC2','BTCS','CNO','ECC','MONA','RBY'] 
  }

  
