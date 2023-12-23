const express = require('express');

const router = express.Router();

const ratingsAndReviewsController = require('../controllers/ratingsAdnReviewController');
// const { router } = require('../app');

router.post('/createrating/:user_id', ratingsAndReviewsController.createRating);

router.get('/getrating/:id', ratingsAndReviewsController.getRating);
// router.post('/like', ratingsAndReviewsController.like)

router.put('/updaterating/:id', ratingsAndReviewsController.updateRating);

router.delete('/deleterating/:id', ratingsAndReviewsController.deleteRating);

module.exports = router;