"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Reservation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Reservation.belongsTo(models.User);
      Reservation.belongsToMany(models.Book, {
        through: "BookReservation",
        as: "reservations",
        foreignKey: "reservatonId",
        otherKey: "bookId",
      });
    }
  }
  Reservation.init(
    {
      reserveDate: DataTypes.DATE,
      returnDate: DataTypes.DATE,
      status: DataTypes.STRING,
      charge: DataTypes.DOUBLE,
      overdue: DataTypes.DOUBLE,
    },
    {
      sequelize,
      modelName: "Reservation",
    }
  );

  return Reservation;
};

// "use strict";
// module.exports = (sequelize, DataTypes) => {
//   const Reservation = sequelize.define(
//     "reservation",
//     {
//       reserveDate: DataTypes.DATE,
//       returnDate: DataTypes.DATE,
//       status: DataTypes.STRING,
//       overdue: DataTypes.DOUBLE,
//     },
//     {
//       tableName: "reservation",
//     }
//   );

//   Reservation.associate = (models) => {
//     Reservation.belongsToMany(models.book, {
//       through: models.BookReservation,
//       as: "booksInReservation",
//       foreignKey: "id",
//     });
//   };

//   return Reservation;
// };
