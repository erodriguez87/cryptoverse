// Defining the learn model

  // brings in the sequelize library and the second one brings in the connection to db
  const Sequelize = require("sequelize");
  const sequelize = require("../config/connection.js");

  // model set up for facts about each of the cryptocurrencies that users can learn about. These are research items that are manually saved to the database by administrators
  module.exports = function(sequelize, DataTypes) {
    var Learn = sequelize.define("Learn", {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          len: [1]
        },
        primaryKey: true,
      },
      cryptoId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      github: {
        type: DataTypes.String,
        allowNull: false,
      },
      website: {
        type:DataTypes.String,
        allowNull: false,
      },
      shortDesc: {
        type:DataTypes.TEXT,
        allowNull: false,
      },
      features: {
        type:DataTypes.TEXT,
        allowNull: false,
      },
      markets: {
        type:DataTypes.TEXT,
        allowNull: false,
      },
      disadvantages: {
        type:DataTypes.TEXT,
        allowNull: false,
      },
      started: {
        type:DataTypes.TEXT,
        allowNull: false,
      },
    }); 
    return Learn;
  };
  