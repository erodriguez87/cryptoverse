var db = require("../models");
// db.Learn

module.exports = function(app) {

  // GET single coin info
  app.get('/api/learn/:id', function(req, res) {
    let cryptoId = req.params.id; 
    db.Learn.findOne({
      where: {
        id: cryptoId
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


}; 