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

router.use(protect);

router
  .route('/')
  .get(getAllReviews)
  .post(restrictTo('user'), setTourAndUserIDs, createReview);

router
  .route('/:id?')
  .get(getReview)
  .patch(restrictTo('admin', 'user'), modifyReview)
  .delete(restrictTo('admin', 'user'), deleteReview);

module.exports = router;
