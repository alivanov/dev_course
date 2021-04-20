const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: String,
  hash: String,
  salt: String,
  refreshTokens: [{ type: mongoose.Schema.Types.ObjectId, ref: 'RefreshToken' }],
});

mongoose.model('User', UserSchema);
