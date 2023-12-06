const express = require('express');
const router = express.Router();

const userController = require('../controllers/usersController');

router.post('/user', userController.createUser);

// router.get('/findall', userController.findAll);

// router.patch('/updateuser/:id', userController.updateUser);

// router.delete('/delete/:id', userController.deleteUser);

module.exports = router;