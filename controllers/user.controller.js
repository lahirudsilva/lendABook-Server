const models = require("../models");
const bcrypt = require("bcrypt");
const { validateRegister } = require("../util/validators");
const jwt = require("jsonwebtoken");

/* REGISTER USER */
exports.signUp = async (req, res) => {
  //Create new user object from user request
  const new_user = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    dateOfBirth: req.body.dateOfBirth,
    contactNo: req.body.contactNo,
    role: req.body.role,
  };

  try {
    let errors = await validateRegister(new_user);

    if (Object.keys(errors).length > 0)
      return res.status(400).json({ error: errors });

    //Hash password
    new_user.password = new_user.password
      ? await bcrypt.hash(new_user.password, 6)
      : null;

    //Create new user object in database
    const user = await models.User.create(new_user);

    //Send user object as response
    return res
      .status(201)
      .json({ message: "Account created successfully, please login!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
};

exports.login = async (req, res) => {
  // const email= req.body.email;
  // const password = req.body.password;
  const { email, password } = req.body;
  let errors = {};
  try {
    if (!email || email.trim() === "") errors.email = "Email must not be empty";
    if (!password || password === "")
      errors.password = "Password must not be empty";

    //If there are any errors return response JSON with errors
    if (Object.keys(errors).length > 0)
      return res.status(400).json({ error: errors });

    const user = await models.User.findOne({ where: { email: email } });

    if (!user)
      return res.status(404).json({ error: { email: "User not found" } });

    //Check password
    const correctPassword = await bcrypt.compare(password, user.password);

    if (!correctPassword) {
      errors.password = "Password is incorrect";
      return res.status(400).json({ error: errors });
    }
    //Generate JWT
    let token = jwt.sign({ email }, process.env.JWT_KEY, {
      expiresIn: 2 * 60 * 60,
    });

    return res.json({ token });
  } catch (error) {
    //console.log(error);
    return res.status(500).json({ error });
  }
};

exports.getLoggedInUser = async (req, res) => {
  try {
    //Find user from database
    const user = await models.User.findByPk(req.userData.id);
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

/* GET ALL USERS */
exports.getUsers = async (req, res) => {
  try {
    const users = await models.User.findAll();
    return res.status(200).json({ users });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

/* GET INFO ON SINGLE USER */
exports.getUser = async (req, res) => {
  const id = req.params.id;

  try {
    let user = await models.User.findByPk(id);
    if (!user)
      return res.status(404).json({ error: { message: "User not found" } });

    //If user calling the req is not an admin and if the data is not the user's data
    if (
      JSON.stringify(user._id) !== JSON.stringify(req.param.id) &&
      req.user.role !== "admin"
    )
      return res.status(403).json({ error: "Unauthoraized" });

    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
};

/* CHANGE isVerified PROPERTY */
exports.changeIsVerified = async (req, res) => {
  try {
    const id = req.params.id;
    let user = await models.User.findByPk(id);

    user.isVerified = !user.isVerified;

    user.save();

    return res.status(200).json({ message: "Data updated successfully" });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

/* CHANGE isBlacklisted PROPERTY */
exports.changeIsBlacklisted = async (req, res) => {
  try {
    const id = req.params.id;
    let user = await models.User.findByPk(id);

    user.isBlacklisted = !user.isBlacklisted;

    user.save();

    return res.status(200).json({ message: "Data updated successfully" });
  } catch (error) {
    return res.status(500).json({ error });
  }
};
