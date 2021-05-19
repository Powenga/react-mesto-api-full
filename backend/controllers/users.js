const { NODE_ENV, JWT_TOKEN } = process.env;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Unauthorized = require('../errors/unauthorized-err');
const BadRequestError = require('../errors/bad-request-err');
const Conflict = require('../errors/conflict-err');
const NotFoundError = require('../errors/not-found-err');
const User = require('../models/user');

const MONGO_DUPLICATE_ERROR_CODE = 11000;
const SALT_ROUNDS = 10;

module.exports.getAllUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
};

module.exports.getMyInfo = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(new NotFoundError('Пользователь по указанному id не найден!'))
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new BadRequestError('Перeдан неккоректный id пользователя!');
      }
      throw err;
    })
    .catch(next);
};

module.exports.getUser = (req, res, next) => {
  User.findById(req.params.id)
    .orFail(new NotFoundError('Пользователь по указанному id не найден!'))
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new BadRequestError('Перeдан неккоректный id пользователя!');
      }
      throw err;
    })
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const { email, password, name, about, avatar } = req.body;
  if (!email || !password) {
    throw new BadRequestError('Не переданы email или пароль!');
  }
  bcrypt
    .hash(password, SALT_ROUNDS)
    .then((hash) => User.create({ email, password: hash, name, about, avatar }))
    .then(({ _id, __v }) =>
      res.status(201).send({ _id, email, name, about, avatar, __v })
    )
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestError(
          'Перeданы неккоректные данные при регистрации!'
        );
      }
      if (err.code === MONGO_DUPLICATE_ERROR_CODE) {
        throw new Conflict('Пользователь с таким email уже существует!');
      }
      throw err;
    })
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError('Не переданы email или пароль!');
  }
  User.findOne({ email })
    .select('+password')
    .orFail(new Unauthorized('Неправильные email или пароль!'))
    .then((user) =>
      bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          throw new Unauthorized('Неправильные email или пароль!');
        }
        return user;
      })
    )
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_TOKEN : 'some-secret-key',
        {
          expiresIn: '7d',
        }
      );
      res
        .cookie('jwt', token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
          sameSite: true,
        })
        .end();
    })
    .catch(next);
};

module.exports.logOut = (req, res, next) => {
  try {
    res
      .cookie('jwt', '', {
        maxAge: 0,
        httpOnly: true,
        sameSite: true,
      })
      .end();
  } catch (err) {
    next(err);
  }
};

module.exports.updateUser = (req, res, next) => {
  const { name, about } = req.body;
  if (!name || !about) {
    throw new BadRequestError('Не переданы имя или описание!');
  }
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true,
    }
  )
    .orFail(new NotFoundError('Пользователь по указанному id не найден!'))
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        throw new BadRequestError(
          'Переданы некорректные данные при обновлении пользователя!'
        );
      }
      throw err;
    })
    .catch(next);
};

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  if (!avatar) {
    throw new BadRequestError('Не передана ссылка на аватар пользователя!');
  }
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
    }
  )
    .orFail(new NotFoundError('Пользователь по указанному id не найден!'))
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        throw new BadRequestError(
          'Переданы некорректные данные при обновлении аватара пользователя!'
        );
      }
      throw err;
    })
    .catch(next);
};
