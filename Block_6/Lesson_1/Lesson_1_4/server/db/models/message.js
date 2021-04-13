const mongoose = require('mongoose');

const { Schema } = mongoose;

const MessageSchema = new Schema(
  {
    body: { type: String, required: true },
    userId: { type: String, required: true },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Message', MessageSchema);
