// Defining the User model

  // brings in the sequelize library and the second one brings in the connection to db
  const Sequelize = require("sequelize");
  const sequelize = require("../config/connection.js");

  // model set up to save information about what coins each user holds and how much they hold of each.
  module.exports = function(sequelize, DataTypes) {
    let Bank = sequelize.define("Bank", {
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
      // userId: { //used for user email
      //   type: DataTypes.STRING,
      //   allowNull: false,
      // },
       value: {
        type:DataTypes.DOUBLE,
        allowNull: false,
      },
    }); 

    Bank.associate = function(models) {
      // Banked coins should belong to users
      // A coin can't be added without a user existing through the foreign key
      Bank.belongsTo(models.User, {
        foreignKey: {
          allowNull: false
        }
      });
    };
    return Bank;
  };