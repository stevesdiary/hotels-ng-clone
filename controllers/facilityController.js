const { v4: uuidv4 } = require('uuid');
const { Facilities, Hotel, Room } = require('../models');
const verifyType = require('../middleware/verifyType');
const facilityController = {
  createFacility: async (req, res) => {
    try{
      const id = uuidv4();
      const { 
        hotel_id,
        restaurant,
        bar_launge,
        security,
        wifi_internet,
        swimming_pool,
        dstv,
        gym,
        cctv,
        car_hire,
        room_service,
        front_desk_24h,
        electricity_24h,
        car_park 
      } = req.body;
      console.log(req.body);
      const facility = await Facilities.create({
        id,
        hotel_id,
        restaurant,
        bar_launge,
        security,
        wifi_internet,
        swimming_pool,
        dstv,
        gym,
        cctv,
        car_hire,
        room_service,
        front_desk_24h,
        electricity_24h,
        car_park,
      });

      if (facility == 1) {
        console.log('Facilities created', facility);
        return res.status(201).send({message: 'Facility created successfully', Facility: facility});
      }
    }
    catch(err){
      return res.status(500).send({message: 'An error occoured, facility not created', Error: err});
    }
  },

  updateFacility: async (req, res) => {
    try{
      const id = req.params.id;
      const {
        restaurant,
        bar_launge,
        security,
        wifi_internet,
        swimming_pool,
        dstv,
        gym,
        cctv,
        car_hire,
        room_service,
        front_desk_24h,
        electricity_24h,
        car_park 
      } = req.body;
      const facility = await Facilities.update({
        restaurant,
        bar_launge,
        security,
        wifi_internet,
        swimming_pool,
        dstv,
        gym,
        cctv,
        car_hire,
        room_service,
        front_desk_24h,
        electricity_24h,
        car_park,
      }, {where: {id}});
      if (facility == 1) {
        console.log('Facilities updated successfully.', facility);
        return res.status(200).send({message: 'Facility updated successfully', Facility: facility});
      }
    }
    catch(err){
      return res.status(500).send({message: 'An error occoured, facility not updated', Error: err});
    }
  },
  
  getFacility: async (req, res) => {
    try{
      const hotel_id = req.params.hotel_id;
      const facility = await Facilities.findOne({
        where: {hotel_id},
        attributes: {
          exclude: [ 'createdAt', 'updatedAt', 'deletedAt']
        },
      });
      if (facility.length == 0 ) {
        console.log(facility.length, 'facility length')
        return res.status(404).send({message: 'Facility record not found'})
      }
      return res.status(200).send({ message: 'Record found', Record: facility });
    }
    catch(err){
      return res.status(500).send({message: 'Error occoured!', Error: err});
    }
  },

  getAllFacilities: async (req, res) => {
    try{
      const facilities = await Facilities.findAll({
        attributes: {
          exclude: [ 'createdAt', 'updatedAt', 'deletedAt']
        },
      });
      return res.status(200).send({message: 'Records found', Records: facilities});
    }
    catch(err){
      return res.status(500).send({message: 'Error occoured!', Error: err});
    }
  },

  deleteFacility: async (req, res) => {
    try{
      const id = req.params.id;
      const facility = await Facilities.destroy({where: {id}});
      // return res.status(200).send({message: 'Records deleted', Records: facilities});
      if (facility == 1) {
        return res.status(500).send({message: `Facility record with id ${id} has been deleted successfully`});
      }
      if(facility == 0){
        return res.send({message: `Facility record with id ${id} does not exist or is deleted in the database`});
      }
    }
    catch(err){
      return res.status(500).send({message: 'Error occoured!', Error: err});
    }
  }
};

module.exports = facilityController;