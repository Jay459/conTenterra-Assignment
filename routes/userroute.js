const user_controller = require('../controllers/userController');
const {isAuthenticatedUser,authRoles} = require('../middleware/auth')
const router = require('express').Router();

router.post('/new',user_controller.createUser);

router.post('/login', user_controller.userLogin);

router.get('/getallusers',isAuthenticatedUser, authRoles('admin') , user_controller.getAllUsers)

module.exports = router