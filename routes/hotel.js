const express = require('express');
const router = express.Router();
const verifyUserType = require('../middleware/verifyUserType');
const {authentication} = require("../middleware/authentication");
const hotelController = require('../controllers/hotelController');

router.post('/createhotel', authentication, verifyUserType('admin'), hotelController.createHotel);

router.get('/findall', hotelController.findAllHotel);

router.get('/topdeals', hotelController.topDeals);

router.get('/tophotels', hotelController.topHotelsByState);

router.get('/hotels-by-cities', hotelController.hotelsByCity);

router.get('/topdestinations', hotelController.getTopDestinations);

router.get('/findone/:id', authentication, verifyUserType('admin', 'user'), hotelController.findOneHotel);

router.get('/bydate', hotelController.findHotelByDate);

router.put('/update/:id', verifyUserType('admin'), hotelController.updateHotel);

router.delete('/delete/:id', verifyUserType('admin'), hotelController.deleteHotel);



module.exports = router;
