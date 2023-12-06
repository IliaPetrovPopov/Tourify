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

const router = express.Router();

// router.param('id', checkId);

router.route('/tour-stats').get(getTourStats);
router.route('/montly-plan/:year').get(getMontlyPlan);
router.route('/top-5-cheapest-tours').get(aliasTopTours, getAllTours);
router.route('/').get(getAllTours).post(createTour);
router.route('/:id?').get(getTour).patch(modifyTour).delete(deleteTour);

module.exports = router;
