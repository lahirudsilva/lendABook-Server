const models = require("../models");
const moment = require("moment");

//Used to validate errors on register
exports.validateRegister = async (data) => {
  let errors = {};

  try {
    let user = await models.User.findOne({ where: { email: data.email } });
    if (user) errors.email = "Email already exists";

    user = await models.User.findOne({ where: { contactNo: data.contactNo } });
    if (user) errors.contactNo = "This contact number is already in use";

    if (data.password !== data.confirmPassword)
      errors.confirmPassword = "Passwords dont match";

    return errors;
  } catch (error) {
    return error;
  }
};

exports.getList = async (reserve, returnBack) => {
  const books = await models.Book.findAll({
    where: {
      isAvailable: true,
    },
  });

  const unavailableBookIds = [];

  let availableBooks = books;

  return availableBooks;
};
