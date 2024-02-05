const express = require('express');
const router = express.Router();
const verifyType = require('../middleware/verifyType');
const userController = require('../controllers/usersController');
const { authentication } = require('../middleware/authentication');

router.get('/alluser', userController.findAllUser); //authentication, verifyType(['admin']),

router.get('/user/:id', userController.findOne); // authentication, verifyType(['admin']),

router.put('/updateuser/:id', userController.updateUser); //authentication, verifyType(['admin'])

router.delete('/deleteuser/:id', userController.deleteUser);

module.exports = router;