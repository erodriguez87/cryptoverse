const express = require("express");
const bodyParser = require("body-parser");
const exphbs = require("express-handlebars");
const expressJWT = require("express-jwt"); 
const PORT = process.env.PORT || 8000;

const app = express();
const db = require('./models');

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// expressJWT Setup - Not needed??
// app.use(expressJWT({ secret: "JWTpassword" }).unless({path: ['/', '/login', 'api/user', '/compare', '/learn', '/api/learn']}));

// Handlebars =========================
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Routes ==============================
require("./routes/html-routes.js")(app);
require("./routes/user-api-routes.js")(app);
require("./routes/learn-api-routes.js")(app);
require("./routes/news-api-routes.js")(app);
// require("./routes/crypto-api-routes.js")(app);

// Sequelize Sync ======================
db.sequelize.sync({ force: true }).then(function() {
  //creating a persistant instance for testing. 
  db.Learn.bulkCreate([
    {
    id: '1', 
    cryptoId: 'btc', 
    name: 'bitcoin', 
    github: 'https://github.com/bitcoin/bitcoin', 
    website: 'https://bitcoin.org/en/', 
    shortDesc: 'the grand daddy', 
    features: 'fast currency', 
    markets: 'currency', 
    disadvantages: 'expensive transactions, slow', 
    started: '2009',
    }, {
    id: '2', 
    cryptoId: 'eth', 
    name: 'ethereum', 
    github: 'https://github.com/ethereum/', 
    website: 'https://www.ethereum.org/', 
    shortDesc: 'app platform', 
    features: 'application platform, contracts', 
    markets: 'contracts,currency,application', 
    disadvantages: 'scaling issuesw', 
    started: '2014',
    }, {
    id: '3', 
    cryptoId: 'xrp', 
    name: 'ripple', 
    github: 'https://github.com/ripple', 
    website: 'https://ripple.com/', 
    shortDesc: 'a blockchain established to facilitate transfer of money across country borders', 
    features: 'baking, transfery', 
    markets: 'contracts,currency,application', 
    disadvantages: 'centralized', 
    started: '2014',
    }, {
    id: '4', 
    cryptoId: 'ven', 
    name: 'VeChain', 
    github: 'https://github.com/vechain', 
    website: 'https://www.vechain.com/#/', 
    shortDesc: 'A Chinese cryptocurrency project with initial focus on supply-chain management, specifically the problem of counterfeit luxury goods', 
    features: 'inventory tracking and logistics, verifies authenticity of goods, low-level awareness in western markets', 
    markets: '', 
    disadvantages: '', 
    started: '2015',
    }, {
    id: '5', 
    cryptoId: 'trx', 
    name: 'tron', 
    github: 'https://github.com/tronprotocol', 
    website: 'https://tron.network/', 
    shortDesc: 'Driven by Justin Sun‘s vision of a fully decentralized web, it’s also an entertainment content distribution platform built upon the blockchain and peer-to-peer technology. Users can store and build apps using this platform to host and distribute their own content instead of requiring such service from a third party host (which is usually a centralized service).', 
    features: 'Goal of a decentralized internet, Self-ownership of data', 
    markets: '', 
    disadvantages: 'Not yet proven, High number of coins in rotation', 
    started: '2017',
    }, {
    id: '6', 
    cryptoId: 'doge', 
    name: 'Dogecoin', 
    github: 'https://github.com/dogecoin/dogecoin', 
    website: 'http://dogecoin.com/', 
    shortDesc: 'Dogecoin was created by programmer Billy Markus from Portland, Oregon, who hoped to create a fun cryptocurrency that could reach a broader demographic than bitcoin. Much like Bitcoin. It is a decentralized, peer-to-peer digital currency that enables you to easily send money online. Think of it as "the internet currency".', 
    features: 'In January 2018, hit a $2 billion market cap, used frequently for "online tipping", fast confirmation times, low transaction fees, has a robust and devoted following', 
    markets: '', 
    disadvantages: 'Less stable, Less mature, Not widely accepted, security issues', 
    started: '2013',
    }, {
    id: '7', 
    cryptoId: '#', 
    name: '#', 
    github: '#', 
    website: '#/', 
    shortDesc: '#', 
    features: '#', 
    markets: '#', 
    disadvantages: '#', 
    started: '#',
    }, {
    id: '8', 
    cryptoId: '#', 
    name: '#', 
    github: '#', 
    website: '#/', 
    shortDesc: '#', 
    features: '#', 
    markets: '#', 
    disadvantages: '#', 
    started: '#',
  }, {
    id: '9', 
    cryptoId: '#', 
    name: '#', 
    github: '#', 
    website: '#/', 
    shortDesc: '#', 
    features: '#', 
    markets: '#', 
    disadvantages: '#', 
    started: '#',
    }, {
    id: '10', 
    cryptoId: '#', 
    name: '#', 
    github: '#', 
    website: '#/', 
    shortDesc: '#', 
    features: '#', 
    markets: '#', 
    disadvantages: '#', 
    started: '#',
    }, 
  ]).then(function(crypto) {
    console.log("test create");
  });
  
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});

// REMEMBER TO CHANGE FORCE IN SYNC ABOVE TO FALSE