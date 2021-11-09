const models = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

function signUp(req, res) {
  if (req.body.password !== req.body.confirmPassword) {
    res.status(409).json({ message: "password does not match" });
  } else {
    models.User.findOne({ where: { contactNo: req.body.contactNo } }).then(
      (result) => {
        if (result) {
          res.status(409).json({
            message: "Contact number already exists!",
          });
        } else {
          models.User.findOne({ where: { email: req.body.email } })
            .then((result) => {
              if (result) {
                res.status(409).json({
                  message: " Email already exists!",
                });
              } else {
                bcrypt.genSalt(10, function (err, salt) {
                  bcrypt.hash(req.body.password, salt, function (err, hash) {
                    const newUser = {
                      firstName: req.body.firstName,
                      lastName: req.body.lastName,
                      email: req.body.email,
                      password: hash,
                      age: req.body.age,
                      contactNo: req.body.contactNo,
                      role: req.body.role,
                      accountType: req.body.accountType,
                    };

                    models.User.create(newUser)
                      .then((result) => {
                        res.status(201).json({
                          message:
                            "Account created successfully, please login!",
                          // user: result,
                        });
                      })
                      .catch((error) => {
                        res.status(500).json({
                          message: " Error 500: Something went wrong!",
                        });
                      });
                  });
                });
              }
            })
            .catch((error) => {});
        }
      }
    );
  }
}

function getLoggedUser(req, res) {}

module.exports = {
  signUp: signUp,
  getLoggedUser: getLoggedUser,
};
