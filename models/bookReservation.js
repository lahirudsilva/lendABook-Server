"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class BookReservation extends Model {
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
  BookReservation.init(
    {
      reservatonId:{
        type: DataTypes.INTEGER,
        required: [true, "Must not be empty"],
      },
      bookId: {
        type: DataTypes.INTEGER,
        required: [true, "Must not be empty"],
      },
    },
    {
      sequelize,
      modelName: "BookReservation",
    }
  );
  return BookReservation;
};

// "use strict";
// module.exports = (sequelize, DataTypes) => {
//   const BookReservation = sequelize.define(
//     "BookReservation",
//     {
//       book_reservation_id: {
//         type: DataTypes.INTEGER,
//         autoIncrement: true,
//         primaryKey: true,
//       },
//       reservationId: {
//         type: DataTypes.INTEGER,
//         primaryKey: false,
//         references: {
//           model: 'reservation',
//           key: 'id',
//         },
//         onDelete: "cascade",
//         onUpdate: "cascade",
//         unique: "unique-reservation-per-book",
//       },
//       bookId: {
//         type: DataTypes.INTEGER,
//         primaryKey: false,
//         references: {
//           model: 'book',
//           key: 'ISBN',
//         },
//         onDelete: "cascade",
//         onUpdate: "cascade",
//         unique: "unique-reservation-per-book",
//       },
//     },
//     {
//       timestamps: true,
//       tableName: "BookReservation",
//     }
//   );
//   BookReservation.associate = (models) => {
//     // associations can be defined here
//     BookReservation.belongsTo(models.book, {
//       foreignKey: "ISBN",
//       targetKey: "ISBN",
//       as: "Book",
//     });
//     BookReservation.belongsTo(models.reservation, {
//       foreignKey: "id",
//       targetKey: "id",
//       as: "Reservation",
//     });
//   };
//   return BookReservation;
// };
