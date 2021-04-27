const todoService = require("../services/todo.service");

/**
 * @param {Object} req.body.data
 * @returns { } New Todo || err.message
 */
const edit = async (req, res) => {
  try {
    const {
      user: { _id: userId },
      body: { todoId, ...fields },
    } = req;
    const todo = await todoService.edit({ userId, todoId, fields });
    return res.json(todo);
  } catch (err) {
    return res.status(400).send(err.message);
  }
};

const create = async (req, res) => {
  try {
    const {
      user: { _id: userId },
      body: { title },
    } = req;
    const todo = await todoService.create({ userId, title });
    return res.json(todo);
  } catch (err) {
    return res.status(400).send(err.message);
  }
};

const get = async (req, res) => {
  try {
    const {
      user: { _id: userId },
      query: { filters },
    } = req;
    const todos = await todoService.get({ userId, filters });
    return res.json(todos);
  } catch (err) {
    return res.status(400).send(err.message);
  }
};

const deleteTodo = async (req, res) => {
  try {
    const {
      user: { _id: userId },
      body: { todoId },
    } = req;
    const todo = await todoService.delete({ userId, todoId });
    return res.json(todo);
  } catch (err) {
    return res.status(400).send(err.message);
  }
};

module.exports = {
  get,
  create,
  edit,
  delete: deleteTodo,
};
