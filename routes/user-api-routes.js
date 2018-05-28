const db = require("../models");
// db.User
const jwt = require('jsonwebtoken'); 

module.exports = function(app) {
  
  // User Login 
  app.post('/login', function(req, res) {
    // checks for required fields
    if (!req.body.name) {
      res.status(400).send('username required'); 
      return; 
    }
    if (!req.body.email) {
      res.status(400).send('email required'); 
      return; 
    }
    if (!req.body.password) {
      res.status(400).send('password required'); 
      return; 
    }

    db.User.findOne({
      where: {
        name: req.body.name, 
        email: req.body.email, 
        password: req.body.password
      }
    }).then(function(login) {
      const token = jwt.sign({ name: req.body.name}, 'JWTpassword')
      res.status(200).json({token}); 
    }).catch(function(err) {
      res.status(401).send('user name, email, or password incorrect');
    }); 

  })
  
  // GET individual user data
  app.get('/api/user/:userId', ensureToken, function(req, res) {
    jwt.verify(req.token, 'JWTpassword', function(err, data) {
      if (err) {
        res.sendStatus(403); 
      } else {
        let userId = req.params.userId; 
        db.User.findOne({
          where: {
            id: userId
          }, 
          include: [db.Bank] //Need name and table for users' currency balances
        }).then(function(user) {
          res.json(user); 
        });
      }


    })
    // let userId = req.params.userId; 
    // db.User.findOne({
    //   where: {
    //     id: userId
    //   }, 
    //   include: [db.Bank] //Need name and table for users' currency balances
    // }).then(function(user) {
    //   res.json(user); 
    // });
  }); 

  // POST new user
  app.post("/api/user", function(req, res) {
    db.User.create(req.body).then(function(newUser) {
      res.json(newUser);
    });
  });

  // PUT to update user personal info
    // Needed??

  // POST add favs/currency
  app.post('/api/user/:userEmail/bank', ensureToken, function(req, res) {
    jwt.verify(req.token, 'JWTpassword', function(err, data) {
      if (err) {
        res.sendStatus(403); 
      } else {
        let userEmail = req.params.userEmail; 
        db.Bank.create(
          req.body,
          {
          where: {
            userEmail: userEmail
          }, 
          defaults: {balance: 0}})
        .then(function(addCoin) {
          res.json(addCoin); 
        });
      };
    }); 
  }); 


  // PUT to update user currency amounts
  app.put('/api/user/:userEmail/bank/:cryptoId', ensureToken, function(req, res) {
    jwt.verify(req.token, 'JWTpassword', function(err, data) {
      if (err) {
        res.sendStatus(403); 
      } else {
        let userEmail = req.params.userEmail; 
        let cryptoId = req.params.cryptoId; 
        db.Bank.update({
          value: req.body,
        }, {
            where: {
              userEmail: userEmail,
              cryptoId: cryptoId
            }
          }).then(function(updateCoin) {
            res.json(updateCoin); 
          });
        }
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