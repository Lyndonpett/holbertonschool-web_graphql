const { Schema, model } = require('mongoose');

const taskSchema = new Schema({
  title: String,
  weight: Number,
  description: String,
  projectId: String
});

module.exports = model('Task', taskSchema);
