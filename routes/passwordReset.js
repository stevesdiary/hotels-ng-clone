const express = require('express');

const router = express.Router();

const passwordResetController = require('../controllers/passwordResetController');

router.put('/updatepassword', passwordResetController.updatePassword);

module.exports = router;