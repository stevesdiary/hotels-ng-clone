const express = require('express');

const router = express.Router();

const passwordResetController = require('../controllers/passwordResetController');

router.put('/:token', passwordResetController.resetPassword);

module.exports = router;