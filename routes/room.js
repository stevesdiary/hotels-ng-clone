const express = require('express');

const router = express.Router();

const roomController = require('../controllers/roomController');

router.post('/room', roomController.createRoom);

router.get('/room/:id', roomController.getRoom);

router.get('/rooms', roomController.getAllRooms);

router.put('/updateroom/:id', roomController.updateRoom);

router.delete('/deleteroom/:id', roomController.deleteRoom);
module.exports = router;