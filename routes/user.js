const express = require('express');
const router = express.Router();
const verifyUserType = require('../middleware/verifyUserType');
const userController = require('../controllers/usersController');
const { authentication } = require('../middleware/authentication');

router.get('/alluser', userController.findAllUser); //authentication, verifyUserType(['admin']),

router.get('/user/:id', userController.findOne); // authentication, verifyUserType(['admin']),

router.put('/updateuser/:id', userController.updateUser); //authentication, verifyUserType(['admin'])

router.delete('/deleteuser/:id', userController.deleteUser);

module.exports = router;