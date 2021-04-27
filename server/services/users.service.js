const Users = require("../models/user.model");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");

/**
 * @param {string} username
 * @returns {Object || NULL} User || NULL
 */

const findUserByUsername = (username) => Users.findOne({ username });

/**
 * @param {string} email
 * @returns {Object || NULL} User || NULL
 */
const findUserByEmail = (email) => Users.findOne({ email }).lean();

/**
 * @param {string || ObjectId } userId
 * @returns {Object || NULL} User || NULL
 */
const findUserById = (userId) => Users.findOne({ _id: userId }).lean();

/**
 * @param {Object} userData { username, password, age }
 * @returns {Object} new User
 */
const register = async (userData) => {
  try {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    userData.password = hashedPassword;
    const newUser = (await new Users(userData).save())?._doc;
    return newUser;
  } catch (err) {
    throw new Error(`User Not created, ${err.message}`);
  }
};

/**
 * @param {Object} data { username, password }
 * @returns {Object || NULL} User || NULL
 */
const signin = async (data) => {
  try {
    const { email, password } = data;
    const user = await findUserByEmail(email);
    if (user) {
      const success = await bcrypt.compare(password, user.password);
      if (success) return user;
    } else {
      throw new Error("User not found");
    }
  } catch (err) {
    throw new Error(err.message);
  }
};

const generateToken = (id) =>
  jwt.sign(
    {
      data: { _id: id },
    },
    process.env.SECRET_JWT_KEY,
    { expiresIn: "7d" }
  );

module.exports = {
  register,
  findUserById,
  signin,
  findUserByEmail,
  findUserByUsername,
  generateToken,
};
