const express = require('express');

const { protect, restrictTo } = require('../controllers/authentication');
const {
  getAllReviews,
  modifyReview,
  deleteReview,
  getReview,
  createReview,
  setTourAndUserIDs,
} = require('../controllers/review');
const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(getAllReviews)
  .post(protect, restrictTo('user'), setTourAndUserIDs, createReview);

router
  .route('/:id?')
  .get(getReview)
  .patch(modifyReview)
  .delete(protect, restrictTo('admin', 'lead-guide'), deleteReview);

module.exports = router;
