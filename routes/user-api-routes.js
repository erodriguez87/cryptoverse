const db = require("../models"); // db.User
const jwt = require('jsonwebtoken'); 
const cookieParser = require('cookie-parser'); 
const JWTpassword = 'JWTpassword';


module.exports = function(app) {
  app.use(cookieParser(JWTpassword));
  
  // User Login 
  app.post('/api/login', function(req, res) {
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
    }).then(function(user) {
      let token = jwt.sign({user}, JWTpassword, {expiresIn: '1hr'}); 
      
      
    //   // Create a cookie embedding JWT token
    //   res.cookie('jwtAuthToken', jwtAuthToken, { 
    //   secure: process.env.NODE_ENV === 'production',
    //   signed: true
    // });
    // // redirect user to protected HTML route
    //   // res.redirect('/dashboard/' + user.id)
    //   // res.status(200).json({token}); 


    }).catch(function(err) {
      res.status(401).send('user name, email, or password incorrect');
    }); 

  });
  
  // GET individual user data
  app.get('/api/user/:userId', ensureToken, function(req, res) {
    jwt.verify(req.token, JWTpassword, function(err, data) {
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
  }); 

  // POST new user
  app.post("/api/user", function(req, res) {
    db.User.create(req.body).then(function(newUser) {
    }).then(function(user) {
      let token = jwt.sign({user}, JWTpassword, {expiresIn: '1hr'});
      console.log(token); 
      
      
      // Create a cookie embedding JWT token
      res.cookie('token', token)
      res.json(newUser);
      // // redirect user to protected HTML route
      // res.redirect('/dashboard/' + user.id)
      // // res.status(200).json({token}); 


    }).catch(function(err) {
      res.status(401).send('user name, email, or password incorrect');
    }); 

  });

  // PUT to update user personal info
    // Needed??

  // POST add favs/currency
  app.post('/api/user/:userEmail/bank', ensureToken, function(req, res) {
    jwt.verify(req.token, JWTpassword, function(err, data) {
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
    jwt.verify(req.token, JWTpassword, function(err, data) {
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

  // ensure token
  function ensureToken(req, res, next) {
    // get auth header value
    // FORMAT - Authorization: Bearer <access token>
    const bearerHeader = req.headers["authorization"];
    // check if bearer is undefined
    if (typeof bearerHeader !== 'undefined') {
      const bearer = bearerHeader.split(" ");
      const bearerToken = bearer[1];
      req.token = bearerToken;
      next();
    } else {
      res.sendStatus(403);
    }
  }

  // function setLocalStorage(token) {
  //   if (typeof localStorage === "undefined" || localStorage === null) {
  //     var LocalStorage = require('node-localstorage').LocalStorage;
  //     localStorage = new LocalStorage('./scratch');
  //   }
  //   localStorage.setItem('token', token);
  //   console.log(localStorage.getItem(token));
  // }


}; 