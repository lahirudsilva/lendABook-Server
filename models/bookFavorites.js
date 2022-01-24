"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class BookFavorites extends Model {
    static associate(models) {
      BookFavorites.belongsTo(models.User);
      BookFavorites.belongsTo(models.Book);
    }
  }
  BookFavorites.init(
    {},
    {
      sequelize,
      modelName: "BookFavorites",
    }
  );
  return BookFavorites;
};
