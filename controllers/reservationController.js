const { v4: uuidv4 } = require('uuid');

const { Reservation, User, Room, Hotel, Facilities } = require('../models');
const { Model, where } = require('sequelize');
const moment = require('moment');
const user = require('../models/user');

const reservationController = {
  createReservation: async (req, res) => {
    try{
      const hotel_id = req.params.hotel_id;
      const { room_id, user_id, date_in, date_out, payment_status } = req.body;
      console.log(date_in, date_out);
      const id = uuidv4();
      const reservation = await Reservation.create({ id, hotel_id, room_id, user_id, date_in, date_out, payment_status });
      if(reservation){
        return res.status(201).send({ message: `Reservation creatd with id: ${id}`, Record: reservation } )
      }
    }
    catch(err){
      console.log('Reservation not created', err)
      return res.status(500).send({message: 'An error occoured', err})
    }
  },
  getOne: async (req, res) => {
    try{
      const id = req.params.id;
      const reservation = await Reservation.findOne({ 
        where: { id },
        attributes: {
          exclude: [ 'createdAt', 'updatedAt', 'deletedAt']
        },
        include: [
          {
            model: User,
            attributes: {
              exclude: ['id', 'createdAt', 'updatedAt', 'deletedAt']
            }
          },
          {
            model: Hotel,
            attributes: {
              exclude: [ 'id', 'description', 'terms_and_condition', 'createdAt', 'updatedAt', 'deletedAt' ]
            },
            // include: [
            //   {
            //     model: Facilities,
            //     attributes: {
            //       exclude: ['id', 'hotel_id', 'createdAt', 'updatedAt', 'deletedAt']
            //     }
            //   }
            // ]
          },
          {
            model: Room,
            attributes: {
              exclude: [ 'id', 'hotel_id', 'createdAt', 'updatedAt', 'deletedAt']
            }
          },
          
        ]
      });
      if (reservation) {
        return res.status(500).send({message: `Reservation record found`, Reservation: reservation});
      }
      if(reservation == 0){
        return res.send({message: `Reservation with id ${id} does not exist or is deleted in the database`});
      }
    }
    catch(err){
      return res.status(500).send({message: `There was an error.`, err});
    }
    // }
    // catch(err){
    //   console.log('Reservation not created', err)
    //   return res.status(500).send({message: 'An error occoured', err})
    // }
  },

  getAll: async ( req, res ) => {
    try{
      const reservations = await Reservation.findAll({
        attributes: {
          exclude: [ 'createdAt', 'updatedAt', 'deletedAt']
        },
        include: [
          {
            model: User,
            attributes: {
              // include: [ 'first_name', 'last_name' ],
              exclude: ['id', 'createdAt', 'updatedAt', 'deletedAt']
            }
          },
          {
            model: Hotel,
            attributes: {
              exclude: [ 'id', 'description', 'terms_and_condition', 'createdAt', 'updatedAt', 'deletedAt' ]
            },
            // include: [
            //   {
            //     model: Facilities,
            //     attributes: {
            //       exclude: ['id', 'hotel_id', 'createdAt', 'updatedAt', 'deletedAt']
            //     }
            //   }
            // ]
          },
          {
            model: Room,
            attributes: {
              exclude: [ 'id', 'hotel_id', 'createdAt', 'updatedAt', 'deletedAt']
            }
          },
          
        ]
      });
      // return res.status(500).send({message: `Reservation record found`, Reservation: reservation});
    
      if (reservations) {
        return res.status(500).send({message: `Reservation records found`, Reservation: reservations});
      }
      if(reservations.count == 0){
        return res.send({message: `Reservation with id ${id} does not exist or is deleted in the database`});
      }
    }
    catch(err){
      return res.status(500).send({message: `There was an error.`, err});
    }
  },
  updateReservation: async (req, res) => {
    try{
      const id = req.params.id;
      const updateReservation = await Reservation.update({status: 'used'},{where: {id}});
      if (updateReservation){
        return res.status(200).send({Message: 'Reservation has been updated to "used".'});
      }
    }
    catch(err){
      return res.status(500).send({Message: 'Reservation unable to update.', Error: err});
    }
  },
  deleteReservation: async (req, res) => {
    try{
      con
    }
    catch(err){
      return res.status(500).send({Message: 'Reservation unable to update.', Error: err});
    }
  }
}

module.exports = reservationController;