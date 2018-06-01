const express = require('express'); 
const db = require('../models/'); 
// const router = express.Router(); 
const jwtExp = require('express-jwt');
const JWTpassword = 'JWTpassword';


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
  // verify authorization via cookie using express-jwt
  app.use('/dashboard', jwtExp({
    secret: JWTpassword,
    getToken: function fromCookie(req) {
        if (req.signedCookies) {
            return req.signedCookies.token;
        }
        return null;
    }
  }));

  app.get('/dashboard/:id', ensureToken, function(req, res) {
    // jwt.verify(req.token, 'JWTpassword', function(err, data) {
    //   if (err) {
    //     res.sendStatus(403); 
    //   } else {
      let userId = req.params.id; 
      // req.user contains your payload from jwtAuthToken
      res.render('dashboard', { user: req.user })
    //   }; 
    // }); 
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