const express = require('express'); 
const db = require('../models/'); 
// const router = express.Router(); 

module.exports = function(app) {

  app.get('/', function(req, res) {
    res.render('home')
  }); 

  app.get('/compare', function(req, res) {
    res.render('compare')
  }); 

  app.get('/learn', function(req, res) {
    res.render('learn')
  }); 

  // Needs JWT
  app.get('/dashboard/:id', ensureToken, function(req, res) {
    jwt.verify(req.token, 'JWTpassword', function(err, data) {
      if (err) {
        res.sendStatus(403); 
      } else {
      let userId = req.params.id; 
      res.render('dashboard')
      }; 
    }); 
  }); 

  function ensureToken(req, res, next) {
    const bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== 'undefined') {
      const bearer = bearerHeader.split(" ");
      const bearerToken = bearer[1];
      req.token = bearerToken;
      next();
    } else {
      res.sendStatus(403);
    }
  }

};