const { celebrate, Joi } = require('celebrate');

module.exports.commonValidator = celebrate({
  body: Joi.object()
    .keys({
      email: Joi.string().email().messages({
        'string.empty': 'email не может быть пустым!',
        'string.email': 'Невалидный email!',
      }),
      password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9-._~:/?#@!$&()=]{8,30}$'))
        .messages({
          'string.empty': 'Пароль не может быть пустым!',
          'string.pattern.base': 'Пароль должен быть от 8 до 30 символов!',
        }),
      name: Joi.string().min(2).max(30).messages({
        'string.empty': 'Имя не может быть пустым!',
        'string.min': 'Имя должно быть больше 2 символов!',
        'string.max': 'Имя должно быть меньше 30 символов!',
      }),
      about: Joi.string().min(2).max(30).messages({
        'string.empty': 'Статус не может быть пустым!',
        'string.min': 'Статус должен быть больше 2 символов!',
        'string.max': 'Статус должен быть меньше 30 символов!',
      }),
      avatar: Joi.string()
        .pattern(
          new RegExp(
            "^(http(s)?://)(www.)?[\\w.-]+[\\w-.~:?#\\[\\]!$&'()+,;=]+"
          )
        )
        .messages({
          'string.pattern.base': 'Ссылка не валидна!',
          'string.empty': 'Ссылка не может быть пустой!',
        }),
      link: Joi.string()
        .pattern(
          new RegExp(
            "^(http(s)?://)(www.)?[\\w.-]+[\\w-.~:?#\\[\\]!$&'()+,;=]+"
          )
        )
        .messages({
          'string.pattern.base': 'Ссылка не валидна!',
          'string.empty': 'Ссылка не может быть пустой!'
        }),
    })
    .unknown(true),
  cookies: Joi.object()
    .keys({
      jwt: Joi.string().pattern(new RegExp('[a-zA-Z0-9._]')),
    })
    .unknown(true),
});

module.exports.userValidator = celebrate({
  params: Joi.object().keys({
    id: Joi.string()
      .alphanum()
      .length(24)
      .message('id пользователя не валиден!'),
  }),
});

module.exports.cardsValidator = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string()
      .alphanum()
      .length(24)
      .message('id карточки не валиден!'),
  }),
});
