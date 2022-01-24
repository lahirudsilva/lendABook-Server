"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    /*
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Book.hasMany(models.BookFavorites);
      Book.belongsToMany(models.Reservation, {
        through: "BookReservation",
        as: "reservations",
        foreignKey: "bookId",
        otherKey: "reservaionId",
      });
    }
  }
  Book.init(
    {
      ISBN: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        required: [true, "Must not be empty"],
      },
      bookCover: {
        type: DataTypes.STRING,
        required: [true, "Must not be empty"],
        defaultValue: "http://localhost:3001/books/default_book.png",
      },
      summary: {
        type: DataTypes.STRING(1000),
        required: [true, "Must not be empty"],
      },
      category: {
        type: DataTypes.STRING,
        required: [true, "Must not be empty"],
      },
      author: {
        type: DataTypes.STRING,
        required: [true, "Must not be empty"],
      },
      publisher: {
        type: DataTypes.STRING,
        required: [true, "Must not be empty"],
      },
      isAvailable: {
        type: DataTypes.BOOLEAN,
        required: [true, "Must not be empty"],
        defaultValue: true,
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
      modelName: "Book",
      timestamps: false,
    }
  );
  return Book;
};

// "use strict";
// module.exports = (sequelize, DataTypes) => {
//   const Book = sequelize.define(
//     "book",
//     {
//       ISBN: { type: DataTypes.INTEGER, primaryKey: true },
//       title: DataTypes.STRING,
//       bookCover: {
//         type: DataTypes.STRING,
//         required: true,
//         defaultValue: "http://localhost:3001/books/default_book.png",
//       },
//       summary: DataTypes.STRING,
//       category: DataTypes.STRING,
//       author: DataTypes.STRING,
//       publisher: DataTypes.STRING,
//       isAvailable: {
//         type: DataTypes.BOOLEAN,
//         required: true,
//         defaultValue: true,
//       },
//       rating: DataTypes.INTEGER,
//     },
//     {
//       tableName: 'book'
//     }
//   );

//   Book.associate =  (models) => {
//     Book.belongsToMany(models.reservation, {
//       through: models.BookReservation,
//       as: "reservationsForBook",
//       foreignKey: "ISBN",
//     });
//   };

//   return Book;
// };
