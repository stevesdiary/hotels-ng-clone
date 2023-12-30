const { v4: uuidv4 } = require('uuid');
const { Hotel, Room, Facility, RatingAndReview, Reservation } = require('../models');

const hotelController = {
  createHotel: async (req, res) => {
    try{
      const id = uuidv4();
      const { name, address, city, state, description, hotel_type, number_of_rooms, contact_email, contact_phone, terms_and_condition } = req.body;
      const createHotel = await Hotel.create({id, name, address, city, state, description, hotel_type, number_of_rooms, contact_email, contact_phone, terms_and_condition});
      // console.log('Record created', createHotel);
      return res.status(201).send({message: 'Record created.', data: createHotel})
    }
    catch(err){
      return res.status(500).send({ message: 'An error occoured', err})
    }
  },

  findAllHotel: async (req, res) => {
    try{
      // SHowing likes, review, (avg)price/night, facilities
      const hotels = await Hotel.findAll({
        attributes: {
          exclude: [ 'createdAt', 'updatedAt', 'deletedAt']
        },
      });
      return res.status(200).send({Message: `Hotel records found.`, Hotel: hotels})
    } catch(err){
      return res.status(500).send({Message: 'An error occoured', err});
    }
  },

  findOneHotel: async (req, res) => {
    try {
      const id = req.params.id;
      const hotel = await Hotel.findOne({
        where: { id },
        attributes: {
          exclude: [ 'createdAt', 'updatedAt', 'deletedAt'],
        },
        include: [
          {
            model: Room,
            as: 'rooms',
            attributes: {
              exclude: ['id', 'hotel_id', 'createdAt', 'updatedAt', 'deletedAt'],
            },
          },
          {
            model: Facility,
            as: 'facilities',
            attributes: {
              exclude: ['createdAt', 'updatedAt', 'deletedAt'],
            },
          },
          {
            model: RatingAndReview,
            as: 'ratingAndReview',
            attributes: {
              exclude: ['createdAt', 'updatedAt', 'deletedAt'],
            },
          },
          {
            model: Reservation,
            as: 'reservation',
            attributes: {
              exclude: ['createdAt', 'updatedAt', 'deletedAt'],
            },
          },
        ],
      });
  
      if (hotel) {
        return res.status(200).send({ Message: 'Hotel record found.', Hotel: hotel });
      } else {
        return res.status(404).send({ Message: 'Hotel not found.' });
      }
    } catch (err) {
      console.error(err);
      return res.status(500).send({ message: 'An error occurred', err });
    }
  },
  
  updateHotel: async (req, res) => {
    try{
      const id = req.params.id;
      const {name, address, city, state, description, hotel_type, number_of_rooms, contact_email, contact_phone, terms_and_condition } = req.body;
      const updateUser = await Hotel.update({ name, address, city, state, description, hotel_type, number_of_rooms, contact_email, contact_phone, terms_and_condition}, {where: {id}});
      console.log('Record updated', createHotel);
      if(updateUser == 1){
        return res.status(201).send({message: 'Record created.', Hotel: createHotel});
      }
      else{}
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