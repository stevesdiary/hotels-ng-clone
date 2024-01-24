const { v4: uuidv4 } = require('uuid');
const {Room, Hotel} = require('../models');
const roomController = {
  createRoom: async (req, res) => {
    try{
      const hotelEmail = req.body.hotelEmail;
      const id = uuidv4();
      console.log(id);
      const { category, capacity, checkIn, deals, checkOut, description, availability, discount, price, condition, additionalRequest } = req.body;
      const discountOff = Math.round(price * (deals / 100));
      const discountedPrice = price - discountOff;
      const hotel = await Hotel.findOne({where: {contactEmail: hotelEmail}});
      console.log('here is the hotel', hotel, )
      if(!hotel){
        return res.status(404).send({Message: 'Hotel not found so rooms cannot be created.'})
      }

      const hotelId = hotel.id;
      const room = await Room.create({id, hotelId, category, capacity, deals, checkIn, checkOut, description, availability, discount, price, discountedPrice, condition, additionalRequest});
      console.log('Data created', room)
      return res.status(201).send({message: 'Room created successfully', room})
    }
    catch(err){
      console.error('Room not created', err)
      return res.status(500).send({message: 'An error occoured', err})
    }
  },

  getAllRooms: async (req, res) => {
    try{
      const rooms = await Room.findAll();
      return res.status(200).send({message: 'Records found', rooms});
    }
    catch(err){
      return res.status(500).send({message: 'An error occoured', err});
    }
  }, 
  getRoom: async (req, res) => {
    try{
      const id = req.params.id;
      console.log("ID from Params", id);

      const room = await Room.findOne({where: {id}});
      return res.status(200).send({message: 'Record found', room});
    }
    catch(err){
      return res.status(500).send({message: 'An error occoured', err});
    }
  },
  updateRoom: async (req, res) => {
    try{
      const id = req.params.id;
      const {category, capacity, deals, description, availability, price, condition } = req.body;
      const discountOff = Math.round(price * (deals / 100));
      const discountedPrice = price - discountOff;
      const updateRoom = await Room.update({category, capacity, description, availability, deals, price, discountedPrice, condition }, {where: {id}});
      return res.status(200).send({message: `Record with id ${id} has been updated successfully`, updateRoom});
    }
    catch(err){
      return res.status(500).send({message: 'Record unable to update', err})
    }
  },

  deleteRoom: async (req, res) => {
    try{
      const id = req.params.id;
      const deleteRoom = await Room.destroy({where: {id}});
      if (deleteRoom == 1) {
        return res.status(500).send({message: `Room record with id ${id} has been deleted successfully`});
      }
      if(deleteRoom == 0){
        return res.send({message: `Room with id ${id} does not exist or is deleted in the database`});
      }
    }
    catch(err){
      return res.status(500).send({message: `There was an error, room record could not be deleted.`, err});
    }
  } 
};
module.exports = roomController;
