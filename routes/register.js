const express = require('express');
const router = express.Router();
const registerController = require('../controllers/registerController');
const {authentication} = require("../middleware/authentication");
const verifyUserType = require("../middleware/verifyUserType");

router.post('/signup', authentication, verifyUserType('admin'), registerController.registerUser);

module.exports = router;