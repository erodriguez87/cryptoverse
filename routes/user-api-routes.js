require('dotenv').config();
const db = require("../models"); // db.User
const jwt = require('jsonwebtoken'); 
const JWTpassword = process.env.JWTpassword; 
let token = ''; 



module.exports = function(app) {
  
  // User Login 
  app.post('/api/user/login', function(req, res) {
    // search db for existing user
    db.User.findOne({
      where: {
        name: req.body.name, 
        email: req.body.email, 
        password: req.body.password
      }
    }).then(function(user) {
      // save user data without password as payload for jwt
      let passwordProtectedUser = {
        id: user.id,
        name: user.name,
        email: user.email,
      }
      // create jwt
      token = jwt.sign({passwordProtectedUser}, JWTpassword); 
      user.dataValues.token = token; 

      res.json(user); 
    }).catch(function(err) {
      console.log('error', err);
      res.status(401).send('user name, email, or password incorrect');
    }); 
  });
  
  // POST new user
  app.post("/api/user", function(req, res) {
    // create new user in the db
    db.User.create(req.body)
      .then(function(newUser) {
        // save user data without password as payload for jwt
        let passwordProtectedUser = {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
        }
        // create jwt
        token = jwt.sign({ passwordProtectedUser }, JWTpassword);
        newUser.dataValues.token = token; 
         
        res.json(newUser);
      })
      .catch(function(err) {
        console.log('error', err);
        res.status(401).send("user name, email, or password incorrect");
      });
  });
  
  // GET individual user data
  app.get('/api/user/:userId', function(req, res) {
    // verify jwt
    jwt.verify(token, JWTpassword, function(err, data) {
      if (err) {
        res.sendStatus(403); 
      } else {
        let userId = req.params.userId;
        db.User.findOne({
          where: {
            id: req.query.id,
          }, 
          include: [db.Bank] 
        }).then(function(user) {
          res.json(user); 
        }).catch(function(err) {
          console.log(err); 
        });
      };
    });
  }); 

  // GET ALL users
  app.get('/api/users', function(req, res) {
    db.User.findAll({
      include: [ db.Bank] 
    }).then(function(data) {
      res.json(data); 
    });
  });
  
  // POST add new favorites
  app.post('/api/user/:userEmail/bank', function(req, res) {
    // verify jwt
    jwt.verify(token, JWTpassword, function(err, data) {
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
        }).catch(function(err) {
          console.log(err); 
        });
      };
    }); 
  }); 


  // PUT to update user currency amounts
  app.put('/api/user/:userEmail/bank/:cryptoId', function(req, res) {
    console.log('in PUT request'); 
    jwt.verify(token, JWTpassword, function(err, data) {
      if (err) {
        res.sendStatus(403); 
      } else {
        console.log(req.body); 
        let userEmail = req.params.userEmail; 
        let cryptoId = req.params.cryptoId; 
        db.Bank.update({
          value: req.body.value,
        }, {
            where: {
              userEmail: userEmail,
              cryptoId: cryptoId
            }
          }).then(function(updateCoin) {
            res.json(updateCoin); 
          });
        };
    }); 
  }); 
}; 

//   // ensure token
//   function ensureToken(req, res, next) {
//     // get auth header value
//     // FORMAT - Authorization: Bearer <access token>
//     const bearerHeader = req.headers["authorization"];
//     // check if bearer is undefined
//     if (typeof bearerHeader !== 'undefined') {
//       const bearer = bearerHeader.split(" ");
//       const bearerToken = bearer[1];
//       req.token = bearerToken;
//       next();
//     } else {
//       res.sendStatus(403);
//     }
//   };
