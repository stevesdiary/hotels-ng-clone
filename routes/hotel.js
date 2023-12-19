const express = require('express');
const router = express.Router();

const hotelController = require('../controllers/hotelController');

router.post('/createhotel', hotelController.createHotel);

router.get('/findall', hotelController.findAllHotel);

router.get('/findone/:id', hotelController.findOneHotel);

router.put('/update/:id', hotelController.updateHotel);

router.delete('/delete/:id', hotelController.deleteHotel);



module.exports = router;