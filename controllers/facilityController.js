const { v4: uuidv4 } = require('uuid');

const { Facilities, Hotel, Room } = require('../models');
const facilities = require('../models/facilities');
const { where } = require('sequelize');

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

      const facility = await Facilities.create({
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
        console.log('Facilities created');
        return res.status(201).send({message: 'Facility created successfully', Facility: facility});
      }
    }
    catch(err){
      return res.status(500).send({message: 'An error occoured, facility not created', Error: err});
    }
  },
  getFacility: async (req, res) => {
    try{
      const hotel_id = req.params.hotel_id;
      const facility = await Facilities.findOne({where: {hotel_id}});
      return res.status(200).send({message: })
    }
    catch(err){
      return res.status(500).send({message: 'Error occoured!', Error: err});
    }
  },

  getAllFacilities: async (req, res) => {
    try{
      const facilities = await Facilities.findAll();
      return res.status(200).send({message: 'Records found', Records: facilities});
    }
    catch(err){
      return res.status(500).send({message: 'Error occoured!', Error: err});
    }
  }
}