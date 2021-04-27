const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todo.controller');

router.get('/all', todoController.get);

router.post('/', todoController.create);

router.put('/', todoController.edit);

router.delete('/', todoController.delete);


module.exports = router;