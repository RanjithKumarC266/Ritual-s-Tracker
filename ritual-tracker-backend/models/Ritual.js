const mongoose = require('mongoose');

const ritualSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  time: {
    type: String,
    required: true,
  },
  frequency: {
    type: String,
    enum: ['daily', 'weekly', 'monthly'],
    default: 'daily',
  },
  completed: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Ritual = mongoose.model('Ritual', ritualSchema);

module.exports = Ritual;