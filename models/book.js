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
      Book.belongsToMany(models.Reservation, {
        through: "BookReservation",
        as: "books",
        foreignKey: "bookId",
        otherKey: 'reservaionId'
        
      });
    }
  }
  Book.init(
    {
      ISBN: { type: DataTypes.INTEGER, primaryKey: true },
      title: DataTypes.STRING,
      bookCover: {
        type: DataTypes.STRING,
        required: true,
        defaultValue: "http://localhost:3001/books/default_book.png",
      },
      summary: DataTypes.STRING,
      category: DataTypes.STRING,
      author: DataTypes.STRING,
      publisher: DataTypes.STRING,
      isAvailable: {
        type: DataTypes.BOOLEAN,
        required: true,
        defaultValue: true,
      },
      rating: DataTypes.INTEGER,
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
