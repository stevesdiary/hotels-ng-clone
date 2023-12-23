const express = require('express');

const router = express.Router();

const reservationController = require('../controllers/reservationController');

router.post('/reservation', reservationController.createReservation);

router.get('/getone/:id', reservationController.getOne);

router.get('/getall', reservationController.getAll);

// router.put('/update/:id', reservationController.updateReservation);

// router.delete('/delete/:id', reservationController.delete)

module.exports = router;