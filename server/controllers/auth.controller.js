const userService = require("../services/users.service");
const validationService = require("../services/validation.service");
const jwt = require("jsonwebtoken");

/**
 * @param {Object} req.body.data
 * @returns { Token || String } New User || err.message
 */
const register = async (req, res) => {
  try {
    const { body: data } = req;
    const error = validationService.isCreateUserValid(data);
    if (error) throw new Error(error.message);

    let isExists = await userService.findUserByEmail(data.email);
    if (isExists) throw new Error("Email already exists");

    isExists = await userService.findUserByUsername(data.username);
    if (isExists) throw new Error("Username already exists");

    const newUser = await userService.register(data);
    const token = userService.generateToken(newUser._id);
    newUser.token = token;

    return res.json({ user: newUser });
  } catch (err) {
    return res.status(400).send(err.message);
  }
};

/**
 * @param {Object} req.body
 * @returns {Token} || err.message
 */
const signin = async (req, res) => {
  try {
    const { body: data } = req;
    const user = await userService.signin(data);
    if (!user) throw new Error("User Not Exists");
    const { password, ...logedUser } = user;
    const token = userService.generateToken(logedUser._id);
    logedUser.token = token;
    return res.json(logedUser);
  } catch (err) {
    return res.status(400).send(err.message);
  }
};

/**
 * @param {token} req.query
 * @returns {User} || err.message
 */
const loadUserFromToken = async (req, res) => {
  try {
    const { token } = req.query;
    if (!token) throw new Error("No token provided");

    jwt.verify(token, process.env.SECRET_JWT_KEY, async (err, jwtData) => {
      if (err) throw new Error("Token is not valid");
      const userID = jwtData?.data?._id;
      if (!userID) throw new Error("Token is not valid");
      const user = await userService.findUserById(userID);
      if (!user) throw new Error("User not found");
      const { password, ...logedUser } = user;
      return res.json(logedUser);
    });
  } catch (err) {
    res.status(400).send(err.message);
  }
};

module.exports = {
  register,
  signin,
  loadUserFromToken,
};
