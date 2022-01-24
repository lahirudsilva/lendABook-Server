"use strict";
// const { Model } = require("sequelize");

/*Regular expressions for data*/

module.exports = (sequelize, DataTypes) => {
  // class User extends Model {
  //   /**
  //    * Helper method for defining associations.
  //    * This method is not a part of Sequelize lifecycle.
  //    * The `models/index` file will call this method automatically.
  //    */
  //   static associate(models) {
  //     // define association here
  //   }
  // }
  const User = sequelize.define(
    "User",
    {
      email: {
        type: DataTypes.STRING,
        required: [true, "Must not be empty"],
      },
      firstName: {
        type: DataTypes.STRING,
        required: [true, "Must not be empty"],
      },
      lastName: {
        type: DataTypes.STRING,
        required: [true, "Must not be empty"],
      },
      password: {
        type: DataTypes.STRING,
        required: [true, "Must not be empty"],
      },
      dateOfBirth: {
        type: DataTypes.STRING,
        required: [true, "Must not be empty"],
      },
      contactNo: {
        type: DataTypes.STRING,
        unique: true,
        required: [true, "Must not be empty"],
      },
      role: {
        type: DataTypes.STRING,
        required: [true, "Must not be empty"],
        enum: ["customer", "admin"],
      },
      userImageURL: { type: DataTypes.STRING },
      isVerified: {
        type: DataTypes.BOOLEAN,
        required: true,
        defaultValue: false,
      },
      isBlacklisted: {
        type: DataTypes.BOOLEAN,
        required: true,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "User",
      timestamps: true,
    }
  );
  User.associate = function (models) {
    // define association here
    User.hasMany(models.Reservation);
    User.hasMany(models.BookFavorites);
    User.belongsTo(models.Subscription, {
      as: "subscrption",
      foreignKey: "subscriptionID",
    });
  };
  return User;
};
