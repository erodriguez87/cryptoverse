// Set up MySQL connection.
  var Sequelize = require("sequelize");

  // Sequelize connection setup
  var sequelize = new Sequelize("cryptoverse_db", "root", "SQLPassword!", {
    host: "localhost",
    port: 3306,
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    }
  });

  // Exports the connection for other files to use
  module.exports = sequelize;
