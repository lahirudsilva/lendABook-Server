"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    /*
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Movie.belongsToMany(models.Reservation, {
        through: "MovieReservation",
        as: "reservations",
        foreignKey: "movieId",
        otherKey: "reservaionId",
      });
    }
  }
  Movie.init(
    {
      movieId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        required: [true, "Must not be empty"],
      },
      movieCover: {
        type: DataTypes.STRING,
        required: [true, "Must not be empty"],
        defaultValue: "http://localhost:3001/books/default_movie.png",
      },
      summary: {
        type: DataTypes.STRING,
        required: [true, "Must not be empty"],
      },
      category: {
        type: DataTypes.STRING,
        required: [true, "Must not be empty"],
      },
      director: {
        type: DataTypes.STRING,
        required: [true, "Must not be empty"],
      },
      production: {
        type: DataTypes.STRING,
        required: [true, "Must not be empty"],
      },
      trailerUrl: {
        type: DataTypes.STRING,
        required: [true, "Must not be empty"],
      },
      isAvailable: {
        type: DataTypes.BOOLEAN,
        required: [true, "Must not be empty"],
        defaultValue: true,
      },
      isAdultOnly: {
        type: DataTypes.BOOLEAN,
        required: [true, "Must not be empty"],
        defaultValue: false,
      },
      rating: {
        type: DataTypes.INTEGER,
        required: [true, "Must not be empty"],
      },
      noOfCopies: {
        type: DataTypes.INTEGER,
        required: [true, "Must not be empty"],
      },
    },
    {
      sequelize,
      modelName: "Movie",
      timestamps: false,
    }
  );
  return Movie;
};
