const express = require('express');
const router = express.Router();
const verifyType = require('../middleware/verifyType');
const authentication = require("../middleware/authentication");
const hotelController = require('../controllers/hotelController');

router.post('/createhotel', hotelController.createHotel);

router.get('/findall', hotelController.findAllHotel);

router.get('/topdeals', hotelController.topDeals);

router.get('/tophotels', hotelController.topHotelsByState);

router.get('/hotels-by-cities', hotelController.hotelsByCity);

router.get('/topdestinations', hotelController.getTopDestinations);

router.get('/findone/:id', hotelController.findOneHotel);

router.get('/bydate', hotelController.findHotelByDate);

router.put('/update/:id', verifyType, hotelController.updateHotel);

router.delete('/delete/:id', verifyType(['admin']), hotelController.deleteHotel);



module.exports = router;
