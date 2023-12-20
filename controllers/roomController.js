const { v4: uuidv4 } = require('uuid');
const {Room, Hotel} = require('../models');
// const moment = require('moment');
const roomController ={
  createRoom: async (req, res) => {
    try{
      
      const email = req.body.email;
      const id = uuidv4();
      const { hotel_id, category, capacity, description, availability, price, condition } = req.body;
      // const hotel = await Hotel.findOne({where: {email}});
      const check_in = req.body.check_in;
      const check_out = req.body.check_out;
      console.log(check_in, check_out)
      console.log(hotel_id, email, "Here is the hoteel ID", req.body)
      console.log('Did you get here at all?!')
      const room = await Room.create({id, hotel_id, category, capacity, check_in, check_out, description, availability, price, condition});
      console.log('Data created', room)
      return res.status(201).send({message: 'Room created successfully', room})
    }
    catch(err){
      console.log('Room not created', err)
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
      const {category, capacity, description, availability, price, condition } = req.body;
      const updateRoom = await Room.update({category, capacity, description, availability, price, condition }, {where: {id}});
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