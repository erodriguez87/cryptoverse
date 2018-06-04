const express = require('express'); 
const db = require('../models/'); 

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
};