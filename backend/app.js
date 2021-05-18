
require('dotenv').config();
const { celebrate, Joi, errors } = require('celebrate')
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const NotFoundError = require('./errors/not-found-err');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(helmet());
app.use(cors({
  origin: ['https://pof15.nomoredomains.icu', 'https://www.pof15.nomoredomains.icu']
}));
app.use(cookieParser());
app.use(express.json());

app.use(celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().min(2),
    password: Joi.string()
      .pattern(new RegExp('^[a-zA-Z0-9\-\.\_~:/?#@!\$&(\)=]{8,30}$')),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi
      .string()
      .pattern(new RegExp('^(http(s)?://)(www.)?[\\w.-]+[\\w\-.~:?#\\[\\]!$&\'()+,;=]+')),
    link: Joi
      .string()
      .pattern(new RegExp('^(http(s)?://)(www.)?[\\w.-]+[\\w\-.~:?#\\[\\]!$&\'()+,;=]+')),
  }).unknown(true),
  cookies: Joi.object().keys({
    jwt: Joi.string().pattern(new RegExp('[a-zA-Z0-9._]')),
  }).unknown(true),
}));

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signup', createUser);
app.post('/signin', login);

app.use(auth);
app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.use((req, res, next) => {
  next(new NotFoundError('Запрашиваемый ресурс не найден!'))
});

app.use(errorLogger);

app.use(errors());

app.use((error, req, res, next) => {
  const { statusCode = 500, message } = error;
  if (res.headersSent) {
    return next(error);
  }
  return res
    .status(statusCode)
    .send({
      message: statusCode === 500 ? 'Что-то пошло не так!' : message
    });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
