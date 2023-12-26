const express = require('express');
const router = express.Router();

router.post('/', registerController.registerUser);


module.exports = router;