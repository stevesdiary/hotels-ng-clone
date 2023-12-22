const { v4: uuidv4 }= require('uuid');
const {Hotel, User, RatingAndReview } = require('../models');
const moment = require('moment');

const ratingsAdnReviewController = {
  createRating: async (req, res) => {
    try{
      const id = uuidv4();
      const date = moment().format("MMMM Do YYYY");
      console.log(date);
      const {user_id,} = req.params.user_id;
      const userData =  await User.findOne({where: {user_id}});
      first_name = userData.first_name;
      last_name = userData.last_name;
      console.log("USER DETAILS", userData, first_name, last_name)
      const {hotel_id, review_title, review, cleanliness, comfort, service, security, location } = req.body;
      const ratings = await RatingAndReview.create({id, hotel_id, user_id, review_title, date, first_name, last_name, review, cleanliness, comfort, service, security, location});
      return res.status(201).send({message: 'Ratings created', Record: ratings});
    }catch(err){
      return res.status(500).send({message: 'Error occoured', Error: err})
    }
  },

  getRatings: async (req, res) => {
    try{
      const ratings = await RatingAndReview.findAll();
      if (ratings.count > 0){
        return res.status(200).send({message: 'Records retrieved', Record: ratings});
      };
      if (ratings.count == 0){
        return res.status(404).send({message: 'Records not found', Record: ratings});
      };
    }
    catch(err){
      return res.status(500).send({message: 'An error occoured', Error: err})
    }
  },
  updateRating: async (req, res) => {
    try{
      const id = req.params.id;
      const date = moment().format("MMM Do YY");
      const { review_title, review, cleanliness, comfort, service, security, location } = req.body;
      const ratings = await RatingAndReview.create({ review_title, date, review, cleanliness, comfort, service, security, location}, {where: {id}});
      return res.status(201).send({message: 'Ratings created', Record: ratings});
    }catch(err){
      return res.status(500).send({message: 'Error occoured', Error: err});
    }
  },
  deleteRating: async (req, res) => {
    try{
      const id = req.params.id;
      const deleteRating = await RatingAndReview.destroy({where: {id}});
      if (deleteRating == 1) {
        return res.status(500).send({message: `Room record with id ${id} has been deleted successfully`});
      }
      if(deleteRating == 0){
        return res.send({message: `Room with id ${id} does not exist or is deleted in the database`});
      }
    }
    catch(err){
      return res.status(500).send({message: 'AN error occoured', Error: err});
    }
  }
}

module.exports = ratingsAdnReviewController;