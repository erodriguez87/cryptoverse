// Defining the User model

  // model set up to save information about what coins each user holds and how much they hold of each.
  module.exports = function(sequelize, DataTypes) {
    let Bank = sequelize.define("Bank", {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true, 
        validate: {
          len: [1]
        },
        primaryKey: true,
      },
      cryptoId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userEmail: { //used for user email
        type: DataTypes.STRING,
        allowNull: false,
      },
      value: {
        type:DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0, 
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