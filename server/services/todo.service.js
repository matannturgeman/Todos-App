const Todos = require("../models/todo.model");

const switchTodoIdField = (todo) => {
  todo.id = todo._id;
  delete todo._id;
  return todo;
};

exports.get = async ({ userId, filters }) => {
  const sort = {};
  if (filters === "createdDate") {
    sort.createdDate = -1;
  } else if (filters === "modifiedDate") {
    sort.modifiedDate = -1;
  }
  const todos = await Todos.find({ userId }).sort(sort).lean();
  return todos.map(switchTodoIdField);
};

exports.create = async ({ userId, title }) =>
  switchTodoIdField((await new Todos({ userId, title }).save())._doc);

exports.edit = async ({ userId, todoId, fields }) =>
  switchTodoIdField(
    await Todos.findOneAndUpdate(
      { userId, _id: todoId },
      { $set: { ...fields, modifiedDate: new Date() } },
      { new: true }
    ).lean()
  );

exports.delete = async ({ userId, todoId }) =>
  switchTodoIdField(
    await Todos.findOneAndDelete({ userId, _id: todoId }).lean()
  );
