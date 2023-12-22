const { v4: uuidv4 }= require('uuid');
const { User, RatingAndReview } = require('../models');
const moment = require('moment');

const ratingsAdnReviewController = {
  createRating: async (req, res) => {
    try{
      // const id = uuidv4();
      const date = moment().format('YYYY-MM-DD hh:mm:ss');
      // console.log(date);
      const user_id = req.params.user_id;
      const userData =  await User.findOne({where: {id: user_id }});
      first_name = userData.first_name;
      last_name = userData.last_name;
      const id = uuidv4();
      // console.log("USER DETAILS", userData, first_name, last_name)
      const {hotel_id, review_title, review, cleanliness, comfort, service, security, location } = req.body;
      const ratings = await RatingAndReview.create({id, hotel_id, user_id, review_title, date, first_name, last_name, review, cleanliness, comfort, service, security, location});
      return res.status(201).send({message: 'Ratings created', Record: ratings});
    }catch(err){
      return res.status(500).send({message: 'Error occoured', Error: err})
    }
  },
  // Transaction = await DBSERVICE.DatabaseTransaction().createTransaction();
  //     const { id, user_id } = req.body;=  
  //     const user = await DBSERVICE.Users.getOne({ where: { id: user_id } });
  //     const event = await eventService.Event.getEvent(id);
  //     if (user) {
  //       // console.log('USER:', user, 'USER_ID:', user.dataValues.id);
  //     }
  //     if (!event.data.dataValues) {
  //       return res.status(404).json({ message: 'Event_id not found.' });
  //     }
  //     if (!user) {
  //       return res.status(404).json({ message: 'User_id not found.' });
  //     }
      // Check if the user has already liked the event
      // const existingLike = await Like.findOne({
      //   where: { user_id, event_id: id },
      // });
      // if (existingLike) {
      //   return res
      //     .status(403)
      //     .json({ returnErrorMessage, message: 'User already liked the event.' });
      // }
      // if (!existingLike && (user_id && id)) {
      //   await Like.create({
      //     user_id, event_id: id, liked: 1, deleted_at: null,
      //   },

  like: async (req, res) => {
    try{
      const {id, hotel_id, user_id} =  req.body;
      const likeExists = await RatingAndReview.findOne({where: {hotel_id, user_id}});
      if(likeExists){
        
      }
      const like = await RatingAndReview.updateRating({like}, {where: user_id, hotel_id});
      
    }
    catch(err){
      return res.status(500).send({message: 'Error occoured', Error: err})
    }
  },
  getRatings: async (req, res) => {
    try{
      const ratings = await RatingAndReview.findAll();
      // if (ratings.count > 0){
        return res.status(200).send({message: 'Records retrieved', Record: ratings});
      // };
      // if (ratings.count == 0){
      //   return res.status(404).send({message: 'Records not found', Record: ratings});
      // };
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