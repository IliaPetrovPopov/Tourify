const express = require('express');
const { protect, restrictTo } = require('../controllers/authentication');
const {
  getCheckoutSession,
  getAllBookings,
  createBooking,
  getBooking,
  deleteBooking,
  updateBooking,
} = require('../controllers/booking');

const router = express.Router();

router.use(protect);

router.get('/checkout-session/:tourId', getCheckoutSession);

router.use(restrictTo('admin', 'lead-guide'));

router.route('/').get(getAllBookings).post(createBooking);
router.route('/:id').get(getBooking).patch(updateBooking).delete(deleteBooking);

module.exports = router;
