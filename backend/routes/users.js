const router = require('express').Router();
const {
  getAllUsers,
  getUser,
  getMyInfo,
  updateUser,
  updateAvatar,
  logOut
} = require('../controllers/users');
const { userValidator } = require('../middlewares/validator');

router.get('/', getAllUsers);
router.get('/me', getMyInfo);
router.patch('/me', updateUser);
router.patch('/me/avatar', updateAvatar);
router.get('/me/logout', logOut)
router.get('/:id', userValidator, getUser);

module.exports = router;
