const express = require('express');
const router = express.Router();
const verifyType = require('../middleware/verifyType');
const userController = require('../controllers/usersController');
const { authentication } = require('../middleware/authentication');

router.get('/alluser', authentication, verifyType(['admin']), userController.findAllUser);

router.get('/user/:id', authentication, verifyType(['admin']), userController.findOne)

router.put('/updateuser/:id', authentication, verifyType(['admin']), userController.updateUser);

router.delete('/delete/:id', authentication, verifyType(['admin']), userController.deleteUser);

module.exports = router;