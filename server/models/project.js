const { Schema, model, models } = require('mongoose');

const projectSchema = new Schema({
  title: String,
  weight: Number,
  description: String,
});

models.exports = model('Project', projectSchema);
