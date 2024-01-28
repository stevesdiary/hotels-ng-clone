const express = require('express');
const verifyType = require('../middleware/verifyType');
const router = express.Router();

const facilityController = require('../controllers/facilityController');

router.post('/createfacility', verifyType(['admin']), facilityController.createFacility);

router.get('/findfacility/:hotel_id', verifyType(['admin', 'regular', 'guest']), facilityController.getFacility);

router.get('/findfacilities', verifyType(['admin', 'regular', 'guest']), facilityController.getAllFacilities);

router.put('/facility/:id', verifyType(['admin']), facilityController.updateFacility);

router.delete('/facility/:id', verifyType(['admin']), facilityController.deleteFacility);

module.exports = router;