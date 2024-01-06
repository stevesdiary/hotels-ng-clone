const express = require('express');

const router = express.Router();
const verifyType = require('../middleware/verifyType').default;
const passwordResetController = require('../controllers/passwordResetController');

router.put('/:token', verifyType(['premium', 'regular', 'guest', 'admin']), passwordResetController.resetPassword);

module.exports = router;