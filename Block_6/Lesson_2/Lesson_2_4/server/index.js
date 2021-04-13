// https://ssl.com.ua/info/how-ssl-works
// https://timonweb.com/javascript/running-expressjs-server-over-https
// $ openssl req -nodes -new -x509 -keyout server.key -out server.cert

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');
const socketIO = require('socket.io');

// migrate to https
// const fs = require('fs');
// const https = require('https');

const app = express();

const server = http.createServer(app);

// migrate to https
/* let server = https.createServer(
  {
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.cert'),
  },
  app,
); */

// fix https tests
/* if (process.env.NODE_ENV === 'test') {
  server = http.createServer(app);
} */

const io = socketIO(server, {
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
  console.log(`App is listening at port 3333, env: ${process.env.NODE_ENV}`);
});

// test purposes...
module.exports = { server, io };
