const express = require('express');
const { authentication } = require('../middleware/authentication');
const verifyUserType = require('../middleware/verifyUserType');
const router = express.Router();

const roomController = require('../controllers/roomController');

router.post('/room', authentication, verifyUserType('admin'), roomController.createRoom);

router.get('/room/:id', authentication, verifyUserType(['admin']), roomController.getRoom);

router.get('/rooms', authentication, verifyUserType('admin'), roomController.getAllRooms);

router.put('/updateroom/:id', authentication, verifyUserType('admin'), roomController.updateRoom);

router.delete('/deleteroom/:id', authentication, verifyUserType('admin'), roomController.deleteRoom);

module.exports = router;