const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  hash: String,
  salt: String,
});

mongoose.model('User', UserSchema);
