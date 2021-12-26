"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class MovieReservation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    static associate(models) {
      // define association here
      // BookReservation.belongsTo(models.Reservation, {
      //   foreignKey: "reservatonId",
      // });
      // BookReservation.belongsTo(models.Book, { foreignKey: "bookId" });
    }
  }
  MovieReservation.init(
    {
      reservatonId:{
        type: DataTypes.INTEGER,
        required: [true, "Must not be empty"],
      },
      movieId: {
        type: DataTypes.INTEGER,
        required: [true, "Must not be empty"],
      },
    },
    {
      sequelize,
      modelName: "MovieReservation",
    }
  );
  return MovieReservation;
};
