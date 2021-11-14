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
                          //user: result,
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
            .catch((error) => {
              res.status(500).json({
                message: " Something went wrong!",
              });
            });
        }
      }
    );
  }
}

function login(req, res) {
  const { email, password } = req.body;

  models.User.findOne({ where: { email: req.body.email } })
    .then((user) => {
      if (user === null) {
        res.status(401).json({
          message: "User not found!",
        });
      } else {
        bcrypt.compare(
          req.body.password,
          user.password,
          function (err, result) {
            if (result) {
              const token = jwt.sign(
                {
                  email: user.email,
                  id: user.id,
                },
                process.env.JWT_KEY,
                function (err, token) {
                  res.status(200).json({
                    token,
                  });
                }
              );
            } else {
              res.status(401).json({
                message: "password incorrect!",
              });
            }
          }
        );
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: " Something went wrong!",
      });
    });
}

function getLoggedUser(req, res) {
  models.User.findByPk(req.userData.id).then((loggedUser) => {
    res.status(200).json({
      loggedUser,
    });
  });
}

module.exports = {
  signUp: signUp,
  login: login,
  getLoggedUser: getLoggedUser,
};
