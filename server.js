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
require("./routes/crypto-api-routes.js")(app);

// Sequelize Sync ======================
db.sequelize.sync({ force: true }).then(function() {
  //creating a persistant instance for testing. 
  db.Learn.bulkCreate([
    {
    id: '1', 
    cryptoId: 'BTC', 
    name: 'Bitcoin', 
    github: 'https://github.com/bitcoin/bitcoin', 
    website: 'https://bitcoin.org/en/', 
    shortDesc: 'The original digital currency. This is the most well known of the cryptocurrencies and is basically a digital money. ', 
    features: 'Brand recognition, fast relative to banking, established network, on most exchanges', 
    markets: 'Currency, value holding', 
    disadvantages: 'expensive transactions, slow compared to newer cryptos, can sometimes have a negative connotation', 
    started: '2009',
    }, {
    id: '2', 
    cryptoId: 'ETH', 
    name: 'Ethereum', 
    github: 'https://github.com/ethereum/', 
    website: 'https://www.ethereum.org/', 
    shortDesc: 'Ethereum was founded as a basic currency and blockchain for smart contracts and decentralized digital applications. It has become the foundation for many other crypto currencies that have come after it. Second most popular after BTC. ', 
    features: 'Digital Currency, Distributed application platform (Dapps), contracts, available on most exchanges', 
    markets: 'Contracts, currency, applications and programming', 
    disadvantages: 'Scaling issues, heavy competition from newer cryptocurrencies', 
    started: '2014',
    }, {
    id: '3', 
    cryptoId: 'XRP', 
    name: 'Ripple', 
    github: 'https://github.com/ripple', 
    website: 'https://ripple.com/', 
    shortDesc: 'A blockchain established to facilitate transfer of money across country borders. The company works mainly with banks and uses the XRP token to immediately transfer money. In just a few years the company has already partnered with over 100 banks and transfer entities like Western Union.', 
    features: 'Immediate real world applications for Banking industry, extremely fast, well known in finance, Incredible technical team and comapny backing.', 
    markets: 'Contracts, Currency, Digital applications', 
    disadvantages: 'Centralized (Ripple company owns more than 50% of coins, disliked by crypto community for centralization', 
    started: '2012',
    }, {
    id: '4', 
    cryptoId: 'VEN', 
    name: 'VeChain', 
    github: 'https://github.com/vechain', 
    website: 'https://www.vechain.com/#/', 
    shortDesc: 'A Chinese cryptocurrency project with initial focus on supply-chain management, specifically addressing the problem of counterfeit luxury goods. They are targeting being the blockchain for the developing IoT world (Internet of Things).', 
    features: 'Inventory tracking and logistics, verifies authenticity of goods, low-level awareness in western markets', 
    markets: 'Supply chain, retail tracking', 
    disadvantages: 'not well known', 
    started: '2015',
    }, {
    id: '5', 
    cryptoId: 'TRX', 
    name: 'Tron', 
    github: 'https://github.com/tronprotocol', 
    website: 'https://tron.network/', 
    shortDesc: 'Driven by Justin Sun‘s vision of a fully decentralized web, it’s also an entertainment content distribution platform built upon the blockchain and peer-to-peer technology. Users can store and build apps using this platform to host and distribute their own content instead of requiring such service from a third party host (which is usually a centralized service).', 
    features: 'Goal of a decentralized internet, Self-ownership of data',
    markets: '', 
    disadvantages: 'Not yet proven, High number of coins in rotation', 
    started: '2017',
    }, {
    id: '6', 
    cryptoId: 'DOGE', 
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
    cryptoId: 'ADA', 
    name: 'Cardano', 
    github: '#', 
    website: 'https://www.cardano.org/en/home/', 
    shortDesc: 'Cardano is more than just a cryptocurrency, however, it is a technological platform that will be capable of running financial applications currently used every day by individuals, organisations and governments all around the world. The platform is being constructed in layers, which gives the system the flexibility to be more easily maintained and allow for upgrades by way of soft forks.', 
    features: 'fast, great team of academics are behind it, includes voting ', 
    markets: 'currency, applications', 
    disadvantages: 'not much of what is planned is already built', 
    started: '#',
    }, {
    id: '8', 
    cryptoId: 'BAT', 
    name: 'Basic Access Token', 
    github: '#', 
    website: 'https://www.basicattentiontoken.org/', 
    shortDesc: 'Created by the developer behind firefox. BAT is looking to revolutionize digital advertising by putting it on a blockchain. The team believes in sharing profits between users and advertisers. In other words, paying the publishers, advertisers and users with the BAT token for internet use. ', 
    features: 'fast, incredible team behind it, partnered with great companies', 
    markets: 'advertising', 
    disadvantages: 'early on', 
    started: '2017',
  }, {
    id: '9', 
    cryptoId: 'XLM', 
    name: 'Stellar', 
    github: '#', 
    website: '#/', 
    shortDesc: 'Blockchain set up to help financial institutions move money quickly around the world. They compete with Ripple. ', 
    features: 'well liked by the crypto community', 
    markets: 'currency', 
    disadvantages: 'early on, has tough competition', 
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