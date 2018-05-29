var db = require("../models");
// db.Learn

console.log("db.Learn " + db.Learn); 

module.exports = function(app) {

  // GET single coin info
  app.get('/api/learn/:id', function(req, res) {
    let cryptoId = req.params.id; 
    db.Learn.findOne({
      where: {
        cryptoId: cryptoId
      }
    }).then(function(coinInfo) {
      res.json(coinInfo); 
    }); 
  }); 

  // GET all coin info
  app.get('/api/learn', function(req, res) {
    db.Learn.findAll({
    }).then(function(coinInfo) {
      res.json(coinInfo); 
    }); 
  }); 

  // app.post("/api/learn", function(req, res) {
  //   db.Learn.create({
  //     id: '1', 
  //     cryptoId: 'btc', 
  //     name: 'bitcoin', 
  //     github: 'https://github.com/bitcoin/bitcoin', 
  //     website: 'https://bitcoin.org/en/', 
  //     shortDesc: 'the grand daddy', 
  //     features: 'fast currency', 
  //     markets: 'currency', 
  //     disadvantages: 'expensive transactions, slow', 
  //     started: '2009',
  //   }).then(function(crypto) {
  //     console.log(crypto);
  //   })
  // }); 

  
}; 