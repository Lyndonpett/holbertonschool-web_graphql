const { Schema, model, models } = require('mongoose');

const taskSchema = new Schema({
  title: String,
  weight: Number,
  description: String,
  projectId: String,
});

models.exports = model('Task', taskSchema);
