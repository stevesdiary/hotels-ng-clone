const express = require('express');
const verifyType = require('../middleware/verifyUserType');
const router = express.Router();

const facilityController = require('../controllers/facilityController');

router.post('/createfacility', facilityController.createFacility); // verifyType(['admin']),

router.get('/findfacility/:hotel_id', facilityController.getFacility); //verifyType(['admin', 'regular', 'guest']),

router.get('/findfacilities', facilityController.getAllFacilities);

router.put('/facility/:id', facilityController.updateFacility);

router.delete('/facility/:id', facilityController.deleteFacility);

module.exports = router;