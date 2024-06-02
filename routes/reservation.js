const express = require('express');
const router = express.Router();
const { authentication } = require("../middleware/authentication");
const verifyUserType = require("../middleware/verifyUserType");
const reservationController = require('../controllers/reservationController');

router.post('/reservation', authentication, verifyUserType(['user']), reservationController.createReservation);

router.get('/getone/:id', reservationController.getOne);

router.get('/getall', reservationController.getAll);

router.put('/updatereservation/:id', reservationController.updateReservation);

router.delete('/removereservations', reservationController.removeReservations);

router.delete('/deletereservation/:id', reservationController.deleteReservation);
module.exports = router;