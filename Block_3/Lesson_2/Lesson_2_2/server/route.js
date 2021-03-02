//global modules
const express = require('express');
const timeout = require('connect-timeout');

//rest code...
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Hello World!!!');
});

router.get('/health', timeout('5s'), (req, res) => {
  //res.status(200); // 503 - timeout
  res.status(200).end();
});

router.get('/todos', (req, res) => {
  const todos = require('./data/todos.json');
  res.json(todos);
});

module.exports = router;