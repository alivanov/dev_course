const mongoose = require('mongoose');

const mongoDB = require('./config.json')[process.env.NODE_ENV].db;

mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('open', () => {
  console.log('Mongoose connection opened!');
});

db.on('error', () => {
  console.log('MongoDB connection error:');
});

module.exports = db;
