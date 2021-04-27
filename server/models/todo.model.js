const mongoose = require("mongoose");
const { Schema, Types } = mongoose;
const { ObjectId } = Types;

const todoSchema = new Schema(
  {
    title: String,
    createdDate: { type: Date, default: Date.now },
    modifiedDate: { type: Date, default: Date.now },
    done: { type: Boolean, default: false },
    userId: {
      type: ObjectId,
      ref: "Users",
    },
  },
  { collection: "todos", versionKey: false }
);

const todoModel = mongoose.model("Todos", todoSchema);

module.exports = todoModel;
