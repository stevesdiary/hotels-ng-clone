const { v4: uuidv4 } = require('uuid');

const { Reservation, User } = require('../models');
const { Model } = require('sequelize');
const moment = require('moment');
const user = require('../models/user');

const reservationController = {
  createReservation: async (req, res) => {
    try{
      // const date = moment().format("YYYY-MM-DD hh:mm:ss");
      
      const { hotel_id, room_id, user_id, date_in, date_out, payment_status } = req.body;
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
        // include: [
        //   {
        //     model: User,
        //     as: 'user',
        //     // required: false,
        //     // attibutes: ['first_name', 'last_name']
            
        //   }
        // ]
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
      const reservations = await Reservation.findAll();
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
  }
}

module.exports = reservationController;