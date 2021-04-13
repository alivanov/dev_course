// https://timonweb.com/javascript/running-expressjs-server-over-https
// $ openssl req -nodes -new -x509 -keyout server.key -out server.cert

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
// migrate to https
// const fs = require('fs');

const app = express();

const server = require('http').createServer(app);

// migrate to https
/* const server = require('https').createServer(
  {
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.cert'),
  },
  app,
); */

const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:8000',
    methods: ['GET'],
  },
});

const db = require('./db');
const Message = require('./db/models/message');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send('Hello from EXPRESS!');
});

app.get('/messages', (req, res) => {
  Message.find().then((messages) => {
    res.send(messages);
  });
});

app.post('/messages', (req, res) => {
  const message = new Message(req.body);
  message.save().then(() => {
    io.emit('message', message);
    res.send(message);
  });
});

io.on('connection', () => {
  console.log('a user is connected');
});

server.listen(3333, () => {
  console.log('App is listening at port 3333');
});
