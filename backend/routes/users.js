const { celebrate, Joi } = require('celebrate');
const router = require('express').Router();
const {
  getAllUsers,
  getUser,
  getMyInfo,
  updateUser,
  updateAvatar,
} = require('../controllers/users');

router.get('/', getAllUsers);
router.get('/me', getMyInfo);
router.patch('/me', updateUser);
router.patch('/me/avatar', updateAvatar);
router.get('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().alphanum().length(24),
  }),
}), getUser);

module.exports = router;
