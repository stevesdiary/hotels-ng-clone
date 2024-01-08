const express = require('express');
const router = express.Router();
const verifyType = require('../middleware/verifyType');
const hotelController = require('../controllers/hotelController');

router.post('/createhotel', verifyType([ 'admin']), hotelController.createHotel);

router.get('/findall', hotelController.findAllHotel);

router.get('/findone/:id', hotelController.findOneHotel);

router.get('/bydate', hotelController.findHotelByDate);

router.put('/update/:id', hotelController.updateHotel);

router.delete('/delete/:id', hotelController.deleteHotel);



module.exports = router;