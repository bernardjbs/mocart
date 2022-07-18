const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  deleteUser,
  updateUser,
  loginUser
} = require('../../controllers/userController');

// /api/users
router.route('/')
  .get(getUsers)


// /api/users/:userId
router.route('/:userId')
  .get(getSingleUser)
  .put(updateUser)
  .delete(deleteUser);

// /api/users/login
router.route('/login')
  .post(loginUser)

router.route('/signup')
  .post(createUser);
  
module.exports = router;
