-- Setting up the initial database structure. Three tables
DROP DATABASE IF EXISTS cryptoverse_db;
CREATE DATABASE cryptoverse_db;
-- USE cryptoverse_db;

-- table set up for facts about each of the cryptocurrencies that users can learn about. These are research items that are manually saved to the database by administrators
-- CREATE TABLE cryptoverse_learn (
--   id INTEGER NOT NULL AUTO_INCREMENT,
--   cryptoId VARCHAR(10) NOT NULL,
--   name VARCHAR(50) NOT NULL,
--   github VARCHAR(50) NOT NULL,
--   website VARCHAR(50) NOT NULL,
--   shortDesc TEXT(100) NOT NULL,
--    features VARCHAR(200),
--    markets VARCHAR(100) NOT NULL,
--    disadvantages VARCHAR(200),
--    started VARCHAR(20),
--    PRIMARY KEY (id)
--  );--

-- table set up to save user preferred coins, amounts they hold etc...
-- CREATE TABLE cryptoverse_users (
--   id INTEGER NOT NULL AUTO_INCREMENT,
--   name VARCHAR(100) NOT NULL,
--   email VARCHAR(100) NOT NULL,
--   password VARCHAR(100) NOT NULL,
--   PRIMARY KEY (id)
-- -- );

-- Select * From learns; 
