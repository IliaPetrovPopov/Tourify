const express = require('express');
const {
  getAllTours,
  createTour,
  getTour,
  modifyTour,
  deleteTour,
  aliasTopTours,
  getTourStats,
  getMontlyPlan,
} = require('../controllers/tour');
const { protect, restrictTo } = require('../controllers/authentication');
const reviewRouter = require('./review');
const router = express.Router();

// router.param('id', checkId);

// router
//   .route('/:tourID/reviews')
//   .post(protect, restrictTo('user'), createReview);

router.use('/:tourID/reviews', reviewRouter);

router.route('/tour-stats').get(getTourStats);
router.route('/montly-plan/:year').get(getMontlyPlan);
router.route('/top-5-cheapest-tours').get(aliasTopTours, getAllTours);
router.route('/').get(protect, getAllTours).post(createTour);
router
  .route('/:id?')
  .get(getTour)
  .patch(modifyTour)
  .delete(protect, restrictTo('admin', 'lead-guide'), deleteTour);

module.exports = router;
