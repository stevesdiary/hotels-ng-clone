const express = require('express');
const router = express.Router();
const verifyType = require('../middleware/verifyUserType');
const userController = require('../controllers/usersController');
const { authentication } = require('../middleware/authentication');
const verifyUserType = require('../middleware/verifyUserType');

router.get('/alluser', authentication, verifyUserType('admin'), userController.findAllUser); //authentication, verifyType(['admin']),

router.get('/user/:id', authentication, verifyUserType('admin'), userController.findOne); // authentication, verifyType(['admin']),

router.put('/updateuser/:id', authentication, verifyUserType('admin'), userController.updateUser); //authentication, verifyType(['admin'])

router.delete('/deleteuser/:id', authentication, verifyUserType('admin'), userController.deleteUser);

module.exports = router;