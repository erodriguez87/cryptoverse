const db = require("../models"); // db.User
const jwt = require('jsonwebtoken'); 
const cookieParser = require('cookie-parser');
// const jwtExp = require('express-jwt'); 
const JWTpassword = 'JWTpassword';
// const JWTpassword = process.env.JWTpassword; 

let token = ''; 


module.exports = function(app) {
  app.use(cookieParser(JWTpassword));
  // app.use('/api/user', jwtExp({ secret: JWTpassword }));

  
  // User Login 
  app.post('/api/user/login', function(req, res) {
    // console.log(req); 
    db.User.findOne({
      where: {
        name: req.body.name, 
        email: req.body.email, 
        password: req.body.password
      }
    }).then(function(user) {
      // console.log(user.name); 
      let passwordProtectedUser = {
        id: user.id,
        name: user.name,
        email: user.email,
      }
      console.log(passwordProtectedUser); 
      token = jwt.sign({passwordProtectedUser}, JWTpassword, {expiresIn: '1hr'}); 
      console.log(token); 

      // Create a cookie embedding JWT token
      // res.cookie("token", token, {
      //   secure: process.env.NODE_ENV === 'production',
      //   signed: true
      // });

      res.json(user); 

    // res.redirect('/dashboard/' + user.id)
    // redirect user to protected HTML route
    // res.status(200).json({token}); 

    }).catch(function(err) {
      console.log('error', err);
      res.status(401).send('user name, email, or password incorrect');
    }); 
  });
  
  // POST new user
  app.post("/api/user", function(req, res) {
    db.User.create(req.body)
      .then(function(newUser) {
        let passwordProtectedUser = {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
        }
        token = jwt.sign({ passwordProtectedUser }, JWTpassword);
        console.log(token);

        // Create a cookie embedding JWT token
        // res.cookie("token", token, {
        //   secure: process.env.NODE_ENV === "production",
        //   signed: true
        // });

        // let redirect = {url: "/dashboard", token: token}; 
        // console.log(redirect.url); 
        res.json(newUser);
      })
      .catch(function(err) {
        console.log('error', err);
        res.status(401).send("user name, email, or password incorrect");
      });
  });
  
  // GET individual user data
  // ************ removed ensureToken function *******
  app.get('/api/user/:userId', function(req, res) {
    console.log('token: ', token); 
    // console.log(req.query)
    jwt.verify(token, JWTpassword, function(err, data) {
      if (err) {
        res.sendStatus(403); 
      } else {
        let userId = req.params.userId;
        console.log(userId);  
        db.User.findOne({
          where: {
            id: req.query.id,
          }, 
          include: [db.Bank] //Need name and table for users' currency balances
        }).then(function(user) {
          console.log('token verified'); 
          // console.log(user); 
          res.json(user); 
        }).catch(function(err) {
          console.log(err); 
        });
      }
    })
  }); 

  // GET ALL users
  app.get('/api/users', function(req, res) {
    db.User.findAll({
      include: [ db.Bank] 
    }).then(function(data) {
      res.json(data); 
    })
  })
  
  app.get('/api/banks', function(req, res) {
    db.Bank.findAll().then(function(data) {
      res.json(data); 
    })
  })

  // PUT to update user personal info
  // Needed??
  
  // POST add new favorites
  app.post('/api/user/:userEmail/bank', function(req, res) {
    // console.log(req); 
    // console.log("+++++++++++++++++++++++++++"); 
    // console.log(req.body)

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
        })

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