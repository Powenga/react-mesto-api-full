const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 2,
    maxLengeh: 30,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: (value) => /^(http(s)?:\/\/)(www\.)?[\w\.-]+[\w\-\.~:/?#\[\]@!\$&'\(\)\*\+,;=]+/gi
        .test(value),
      message: 'Переданная ссылка не валидна.',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    default: [],
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
