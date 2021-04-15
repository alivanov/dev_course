// https://github.com/alex996/presentations

const express = require('express');
const bodyParser = require('body-parser');

//================================

const app = express();

//================================

const models = require('./models');
const Todo = models.Todo;

//================================

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Public route - available for all!');
});

app.get('/todos', (req, res) => {
  Todo.findAll().then((todos) => {
    res.json({ todos });
  });
});

app.post('/todos', (req, res) => {
  Todo.create({
    title: req.body.title,
    isDone: req.body.isDone,
  }).then(
    (todo) => {
      res.json(todo);
    },
    (validation) => {
      res.status(422).json({
        errors: validation.errors.map((error) => {
          return { attribute: error.path, message: error.message };
        }),
      });
    },
  );
});

//================================

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`App is listening at http://localhost:${port}`);
});
