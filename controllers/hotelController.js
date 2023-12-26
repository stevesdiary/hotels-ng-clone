const { v4: uuidv4 } = require('uuid');
const { Hotel, Room, Facilities, RatingAndReview, Reservation } = require('../models');
const ratingAndReview = require('../models/ratingAndReview');
// const room = require('../models/room');

const hotelController = {
  createHotel: async (req, res) => {
    try{
      const id = uuidv4();
      const { name, address, city, state, description, hotel_type, number_of_rooms, contact_email, contact_phone, terms_and_condition } = req.body;
      const createHotel = await Hotel.create({id, name, address, city, state, description, hotel_type, number_of_rooms, contact_email, contact_phone, terms_and_condition});
      console.log('Record created', createHotel);
      return res.status(201).send({message: 'Record created.', data: createHotel})
    }
    catch(err){
      return res.status(500).send({ message: 'An error occoured', err})
    }
  },

  findAllHotel: async (req, res) => {
    try{
      const hotels = await Hotel.findAll();
      return res.status(200).send({message: `Hotel record found.`, data: hotels})
    } catch(err){
      return res.status(500).send({message: 'An error occoured', err});
    }
  },

  findOneHotel: async (req, res) => {
    try{
      const id = req.params.id;
      const hotel = await Hotel.findOne({
        where: {id},
      //   attibutes: {
        // exclude: [
      //   "terms_and_condition", '],
          include: [
            {
              model: Room,
              as: 'rooms',
              // attibutes: {
              //   include: [ 'category', 'capacity', 'check_out', 'description', 'availability', 'price', 'condition'],
              //   exclude: [ 'id', 'hotel_id', 'createdAt', 'updatedAt', 'deletedAt']
              // }
            },
            {
              model: Facilities,
              as: 'facilities',
              required: false
            },
            {
              model: RatingAndReview,
              as: 'ratingAndReview',
              required: false
            },
            // {
            //   module: Reservation,
            //   as: 'reservation',
            //   required: false
            // }
          ],
          
      });
      // console.log('record found')
      return res.status(200).send({message: `Hotel record found.`, data: hotel})
    } catch(err){
      return res.status(500).send({message: 'An error occoured', err});
    }
  },

  updateHotel: async (req, res) => {
    try{
      const id = req.params.id;
      const {name, address, city, state, description, hotel_type, number_of_rooms, contact_email, contact_phone, terms_and_condition } = req.body;
      const updateUser = await Hotel.update({ name, address, city, state, description, hotel_type, number_of_rooms, contact_email, contact_phone, terms_and_condition}, {where: {id}});
      console.log('Record updated', createHotel);
      if(updateUser == 1){
        return res.status(201).send({message: 'Record created.', data: createHotel});
      } 
    }
    catch(err){
      return res.status(500).send({message: 'An error occoured', err});
    }
  },

  deleteHotel: async (req, res) => {
    try{
      const id = req.params.id;
      const hotel = await Hotel.destroy({where: {id}});
      if ( hotel == 1 ){
        return res.send({message: `User with id ${id} has been deleted successfully!`})
      }
      if( hotel == 0){
        return res.send({message: `User ${id} does not exist or is deleted in the database`})
      }
    }
    catch(err){
      return res.status(500).send({message: 'An error occoured', err});
    }
  }
}
module.exports = hotelController;