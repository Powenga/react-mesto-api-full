const validator = require('validator');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    minLength: 3,
    unique: true,
    validate: {
      validator: (value) => validator.isEmail(value),
      message: 'Пераданный email не валиден.',
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false
  },
  name: {
    type: String,
    default: 'Жак-Ив Кусто',
    minlength: 2,
    maxLengeh: 30,
  },
  about: {
    type: String,
    minlength: 2,
    maxLengeh: 30,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    validate: {
      validator: (value) => /^(http(s)?:\/\/)(www\.)?[\w\.-]+[\w\-\.~:/?#\[\]@!\$&'\(\)\*\+,;=]+/gi
        .test(value),
      message: 'Переданная ссылка не валидна.',
    },
    default: () => 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
  },
});

module.exports = mongoose.model('user', userSchema);
