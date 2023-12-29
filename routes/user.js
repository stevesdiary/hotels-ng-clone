const express = require('express');
const router = express.Router();
const verifyType = require('../middleware/verifyType');
const userController = require('../controllers/usersController');
const { authentication } = require('../middleware/authentication');

// router.post('/user', userController.createUser);

router.get('/alluser', authentication, verifyType(['premium']), userController.findAllUser);

router.get('/user/:id', authentication, verifyType(['premium']), userController.findOne)

router.put('/updateuser/:id', authentication, verifyType(['premium']), userController.updateUser);

router.delete('/delete/:id', authentication, verifyType(['premium']), userController.deleteUser);

module.exports = router;