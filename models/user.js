// Defining the User model

  // brings in the sequelize library and the second one brings in the connection to db
  const Sequelize = require("sequelize");
  const sequelize = require("../config/connection.js");

  // table set up to save user information.
  module.exports = function(sequelize, DataTypes) {
    let User = sequelize.define("User", {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          len: [1]
        },
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.String,
        allowNull: false,
      }
    }); 

    User.associate = function(models) {
      // Associating Users with banked coins
      // Deleted coins when user is deleted
      Author.hasMany(models.Bank, {
        onDelete: "cascade"
      });
    };

    return User;
  };