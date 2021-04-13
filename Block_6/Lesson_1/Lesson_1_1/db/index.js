const mongoose = require('mongoose');
const config = require('./config.json');

mongoose.Promise = global.Promise;

const connectionURL = `mongodb://${config.db.host}:${config.db.port}/${config.db.name}`;

mongoose.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('open', () => {
  console.log(`Mongoose connection opened on ${connectionURL}`);
});

db.on('error', (err) => {
  console.log('Mongoose connection error');
  console.log(err);
});

db.on('disconnected', () => {
  console.log('Mongoose connection disconnected');
});

process.on('SIGINT', () => {
  db.close(() => {
    console.log('Mongoose connection closed throw app termination');
    process.exit(0);
  });
});

module.exports = db;
