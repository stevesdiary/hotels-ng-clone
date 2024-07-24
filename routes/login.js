const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');
const { authentication } = require('../middleware/authentication');
const verifyUserType = require('../middleware/verifyUserType');

router.post('/login', loginController.login);
router.post('/logout', loginController.logout);

module.exports = router;