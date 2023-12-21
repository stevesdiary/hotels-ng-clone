const express = require('express');

const router = express.Router();

const facilityController = require('../controllers/facilityController');

router.post('/createfacility', facilityController.createFacility);

router.get('/findfacility/:hotel_id', facilityController.getFacility);

router.put('/facility/:id', facilityController.updateFacility);

router.delete('/facility/:id', facilityController.deleteFacility);

module.exports = router;