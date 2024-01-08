const express = require('express');
const verifyType = require('../middleware/verifyType');
const router = express.Router();

const facilityController = require('../controllers/facilityController');

router.post('/createfacility', verifyType(['premium']), facilityController.createFacility);

router.get('/findfacility/:hotel_id', verifyType(['premium', 'regular', 'guest']), facilityController.getFacility);

router.get('/findfacilities', verifyType(['premium', 'regular', 'guest']), facilityController.getAllFacilities);

router.put('/facility/:id', verifyType(['premium']), facilityController.updateFacility);

router.delete('/facility/:id', verifyType(['premium']), facilityController.deleteFacility);

module.exports = router;