'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    age: DataTypes.INTEGER,
    contactNo: DataTypes.INTEGER,
    role: DataTypes.STRING,
    userImage: DataTypes.STRING,
    accountType: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
    timestamps: false,
  });
  return User;
};