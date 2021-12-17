"use strict";

module.exports = (sequelize, DataTypes) => {
  const Subsciption = sequelize.define(
    "Subscription",
    {
      subscriptionId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      type: {
        type: DataTypes.STRING,
        required: [true, "Must not be empty"],
      },
      noOfBooks: {
        type: DataTypes.INTEGER,
        required: [true, "Must not be empty"],
      },
      duration_books: {
        type: DataTypes.INTEGER,
        required: [true, "Must not be empty"],
      },
      bookCharge: {
        type: DataTypes.INTEGER,
        required: [true, "Must not be empty"],
      },
      noOfVideos: {
        type: DataTypes.INTEGER,
        required: [true, "Must not be empty"],
      },
      duration_videos: {
        type: DataTypes.INTEGER,
        required: [true, "Must not be empty"],
      },
      video_charge: {
        type: DataTypes.INTEGER,
        required: [true, "Must not be empty"],
      },
      overdue: {
        type: DataTypes.INTEGER,
        required: [true, "Must not be empty"],
      },
      membershipFee: {
        type: DataTypes.INTEGER,
        required: [true, "Must not be empty"],
      },
    },
    {
      sequelize,
      modelName: "Subscription",
      timestamps: false,
    }
  );
  Subsciption.associate = function (models) {
    // define association here
    
  };
  return Subsciption;
};
