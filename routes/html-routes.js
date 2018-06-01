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
  // app.use('/dashboard', jwtExp({
  //   secret: JWTpassword,
  //   getToken: function fromCookie(req) {
  //       if (req.signedCookies) {
  //           return req.signedCookies.token;
  //       }
  //       return null;
  //   }
  // }));

//TODO
//Write a simple route that displays the dashboard and that specific user id
  app.get("/dashboard", function(req, res) {
    console.log(req); 
    res.render('dashboard'); 
  })


  // app.get("/dashboard/", function(req, res) {
  //   console.log(req); 
  //   res.render('dashboard'); 
  // })
//TODO
//Addin your ensureToken function, but don't stop if invalid. Just console log the response. 
//TODO
//If the function works properly, then add our jwt.verify and test
  // app.get('/dashboard/:token', ensureToken, function(req, res) {
  //   let token = req.params.token; 
  //   jwt.verify(token, 'JWTpassword', function(err, data) {
  //     if (err) {
  //       res.sendStatus(403); 
  //     } else {
  //     // req.user contains your payload from jwtAuthToken
  //     res.render('dashboard')
  //     }; 
  //   }); 
  // }); 

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