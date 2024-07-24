const express = require('express');
const verifyUserType = require('../middleware/verifyUserType');
const router = express.Router();
const facilityController = require('../controllers/facilityController');
const { authentication } = require('../middleware/authentication');

router.post('/createfacility', facilityController.createFacility); // verifyUserType(['admin']),

router.get('/findfacility/:hotel_id', facilityController.getFacility); //verifyUserType(['admin', 'regular', 'guest']),

router.get('/findfacilities', facilityController.getAllFacilities);

router.put('/facility/:id', facilityController.updateFacility);

router.delete('/facility/:id',authentication, verifyUserType("admin"), facilityController.deleteFacility);

module.exports = router;