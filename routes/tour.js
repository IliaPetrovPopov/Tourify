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
  getToursWithin,
  getDistances
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
router
  .route('/montly-plan/:year')
  .get(protect, restrictTo('admin', 'lead-guide', 'guide'), getMontlyPlan);
router.route('/top-5-cheapest-tours').get(aliasTopTours, getAllTours);

router.route("/tours-within/:distance/center/:latlng/unit/:unit").get(getToursWithin)
router.route("/distances/:latlng/unit/:unit").get(getDistances)

router
  .route('/')
  .get(getAllTours)
  .post(protect, restrictTo('admin', 'lead-guide'), createTour);
router
  .route('/:id?')
  .get(getTour)
  .patch(protect, restrictTo('admin', 'lead-guide'), modifyTour)
  .delete(protect, restrictTo('admin', 'lead-guide'), deleteTour);

module.exports = router;
