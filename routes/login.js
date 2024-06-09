const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');
const { authentication } = require('../middleware/authentication');
const verifyUserType = require('../middleware/verifyUserType');

router.post('/login', loginController.login); //, authentication(['admin'])

module.exports = router;