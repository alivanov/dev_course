//global modules
const express = require('express');
const path = require('path');
const fs = require('fs');

//rest code...
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Hello World!!!  ' + (new Date()).toString());
});

router.get('/todos', (req, res) => {
  const rawdata = fs.readFileSync(path.join(__dirname, './data/todos.json'));
  const todos = JSON.parse(rawdata);

  res.json(todos);
});

module.exports = router;