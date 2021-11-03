'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Book.init({
    ISBN:{ type: DataTypes.INTEGER,
      primaryKey: true} ,
    title: DataTypes.STRING,
    bookCover: DataTypes.STRING,
    summary: DataTypes.STRING,
    category: DataTypes.STRING,
    author: DataTypes.STRING,
    publisher: DataTypes.STRING,
    status: DataTypes.STRING,
    numberOfCopies: DataTypes.INTEGER,
    rating: DataTypes.INTEGER
  },
  {
    sequelize,
    modelName: 'Book',
    timestamps: false,
  });
  return Book;
};