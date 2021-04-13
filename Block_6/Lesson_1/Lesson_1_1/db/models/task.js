const mongoose = require('mongoose');

const { Schema } = mongoose;

const TaskSchema = new Schema({
  title: { type: String, required: true },
  date: {
    type: Date,
    default: new Date(),
  },
  description: { type: String },
});

// Export model
module.exports = mongoose.model('Task', TaskSchema);
