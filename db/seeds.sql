INSERT INTO cryptoverse_db.cryptoverse_learn (id, cryptoId, name, github, website, shortDesc, features, markets, disadvantages, started) 

VALUES ('1', 'btc', 'bitcoin', 'https://github.com/bitcoin/bitcoin', 'https://bitcoin.org/en/', 'the grand daddy', 'fast currency', 'currency', 'expensive transactions, slow', ' 2009');

INSERT INTO cryptoverse_db.cryptoverse_learn (id, cryptoId, name, github, website, shortDesc, features, markets, disadvantages, started) 

VALUES ('2', 'eth', 'ethereum', 'https://github.com/ethereum/', 'https://www.ethereum.org/', 'app platform', 'application platform, contracts', 'contracts,currency,application', 'scaling issues', ' 2014');

INSERT INTO cryptoverse_db.cryptoverse_learn (id, cryptoId, name, github, website, shortDesc, features, markets, disadvantages, started) 

VALUES ('3', 'xrp', 'ripple', 'https://github.com/ripple', 'https://ripple.com/', 'a blockchain established to facilitate transfer of money across country borders', 'baking, transfer', 'contracts,currency,application', 'centralized', ' 2014');

INSERT INTO cryptoverse_db.cryptoverse_learn (id, cryptoId, name, github, website, shortDesc, features, markets, disadvantages, started) 

VALUES ('4', 'VEN', 'VeChain', 'https://github.com/vechain', 'https://www.vechain.com/#/', 'A Chinese cryptocurrency project with initial focus on supply-chain management, specifically the problem of counterfeit luxury goods', 'inventory tracking and logistics, verifies authenticity of goods, low-level awareness in western markets', 'MARKETS', 'DISADVANTAGES', '2015');

INSERT INTO cryptoverse_db.cryptoverse_learn (id, cryptoId, name, github, website, shortDesc, features, markets, disadvantages, started) 

VALUES ('5', 'TRX', 'Tron', 'https://github.com/tronprotocol', 'https://tron.network/', 'Driven by Justin Sun‘s vision of a fully decentralized web, it’s also an entertainment content distribution platform built upon the blockchain and peer-to-peer technology. Users can store and build apps using this platform to host and distribute their own content instead of requiring such service from a third party host (which is usually a centralized service).', 'Goal of a decentralized internet, Self-ownership of data', 'MARKETS', 'Not yet proven, High number of coins in rotation', '2017'); 

INSERT INTO cryptoverse_db.cryptoverse_learn (id, cryptoId, name, github, website, shortDesc, features, markets, disadvantages, started) 

VALUES ('6', 'DOGE', 'Dogecoin', 'https://github.com/dogecoin/dogecoin', 'http://dogecoin.com/', 'Dogecoin was created by programmer Billy Markus from Portland, Oregon, who hoped to create a fun cryptocurrency that could reach a broader demographic than bitcoin. Much like Bitcoin. It is a decentralized, peer-to-peer digital currency that enables you to easily send money online. Think of it as "the internet currency".', 'In January 2018, hit a $2 billion market cap, used frequently for "online tipping", fast confirmation times, low transaction fees, has a robust and devoted following', 'MARKETS', 'Less stable, Less mature, Not widely accepted, security issues', '2013');

Select * From cryptoverse_learn; 

-- learn seeds
INSERT INTO cryptoverse_db.learns (id, cryptoId, name, github, website, shortDesc, features, markets, disadvantages, started) 
VALUES ('1', 'btc', 'bitcoin', 'https://github.com/bitcoin/bitcoin', 'https://bitcoin.org/en/', 'the grand daddy', 'fast currency', 'currency', 'expensive transactions, slow', ' 2009'), 
('2', 'eth', 'ethereum', 'https://github.com/ethereum/', 'https://www.ethereum.org/', 'app platform', 'application platform, contracts', 'contracts,currency,application', 'scaling issues', ' 2014'),
('3', 'xrp', 'ripple', 'https://github.com/ripple', 'https://ripple.com/', 'a blockchain established to facilitate transfer of money across country borders', 'baking, transfer', 'contracts,currency,application', 'centralized', ' 2014'),
('4', 'VEN', 'VeChain', 'https://github.com/vechain', 'https://www.vechain.com/#/', 'A Chinese cryptocurrency project with initial focus on supply-chain management, specifically the problem of counterfeit luxury goods', 'inventory tracking and logistics, verifies authenticity of goods, low-level awareness in western markets', 'MARKETS', 'DISADVANTAGES', '2015'),
('5', 'TRX', 'Tron', 'https://github.com/tronprotocol', 'https://tron.network/', 'Driven by Justin Sun‘s vision of a fully decentralized web, it’s also an entertainment content distribution platform built upon the blockchain and peer-to-peer technology. Users can store and build apps using this platform to host and distribute their own content instead of requiring such service from a third party host (which is usually a centralized service).', 'Goal of a decentralized internet, Self-ownership of data', 'MARKETS', 'Not yet proven, High number of coins in rotation', '2017'),
('6', 'DOGE', 'Dogecoin', 'https://github.com/dogecoin/dogecoin', 'http://dogecoin.com/', 'Dogecoin was created by programmer Billy Markus from Portland, Oregon, who hoped to create a fun cryptocurrency that could reach a broader demographic than bitcoin. Much like Bitcoin. It is a decentralized, peer-to-peer digital currency that enables you to easily send money online. Think of it as "the internet currency".', 'In January 2018, hit a $2 billion market cap, used frequently for "online tipping", fast confirmation times, low transaction fees, has a robust and devoted following', 'MARKETS', 'Less stable, Less mature, Not widely accepted, security issues', '2013');

Select * From cryptoverse_learn; 