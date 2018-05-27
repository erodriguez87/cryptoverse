var db = require("../models");
// db.User

module.exports = function(app) {
  
  // GET individual user data
  app.get('/api/user/:userId', function(req, res) {
    let userId = req.params.userId; 
    db.User.findOne({
      where: {
        id: userId
      }, 
      include: [db.Bank] //Need name and table for users' currency balances
    }).then(function(user) {
      res.json(user); 
    });
  }); 

  // POST new user
  app.post("/api/user", function(req, res) {
    db.Post.create(req.body).then(function(newUser) {
      res.json(newUser);
    });
  });

  // PUT to update user personal info
    // Needed??

  // POST add favs/currency
  app.post('/api/user/:userId/bank', function(req,res) {
    let userId = req.params.userId; 
    db.Bank.findOrCreate(
      req.body,
      {
      where: {
        userId: userId
      }, 
      defaults: {balance: 0}})
    .spread((user, created) => {
      console.log(user.get({
        plain: true
      }))
    })
    .then(function(addCoin) {
      console.log(created)
      res.json(addCoin); 
    });
    // the "spread" on line 32 divides the array into its 2 parts and passes them as arguments to the callback function defined beginning at line 32, which treats them as "user" and "created" in this case. (So "user" will be the object from index 0 of the returned array and "created" will equal "true". 
  }); 


  // PUT to update user currency amounts
  app.put('/api/user/:userId/bank/:cryptoId', function(req,res) {
    let userId = req.params.userId; 
    let cryptoId = req.params.cryptoId; 
    db.Bank.update(
      req.body,
      {
        where: {
          userId: userId,
          cryptoId: cryptoId
        }
      }).then(function(updateCoin) {
        res.json(updateCoin); 
      });
  }); 
}; 