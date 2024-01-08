const express = require('express');

const router = express.Router();
const verifyType = require('../middleware/verifyType').default;
const passwordResetController = require('../controllers/passwordResetController');
//, verifyType(['premium', 'regular', 'guest', 'admin'])
router.put('/:token', passwordResetController.resetPassword);

module.exports = router;