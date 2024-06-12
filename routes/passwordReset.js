const express = require('express');

const router = express.Router();
const verifyUserType = require('../middleware/verifyUserType').default;
const passwordResetController = require('../controllers/passwordResetController');
//, verifyUserType(['premium', 'regular', 'guest', 'admin'])
router.put('/:token', passwordResetController.resetPassword);

module.exports = router;