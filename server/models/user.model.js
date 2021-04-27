const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    email: String,
    username: String,
    password: String,
    age: Number,
  },
  { collection: "users", versionKey: false }
);

const userModel = mongoose.model("Users", userSchema);

module.exports = userModel;
