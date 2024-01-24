const Booking = require('../models/bookingModel');
const Tour = require('../models/tourModel');
const AppError = require('../utils/app-error');
const catchAsync = require('../utils/catch-async');

module.exports.alerts = (req, res, next) => {
  const { alert } = req.query;
  if (alert === 'booking')
    res.locals.alert =
      "Your booking was successful! Please check your email for confirmation! If your booking doesn't show up, please reload the page.";

  next();
};

module.exports.getOverview = catchAsync(async (req, res, next) => {
  const tours = await Tour.find();

  res.status(200).render('overview', {
    title: 'All Tours',
    tours,
  });
});

module.exports.getTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findOne({ slug: req.params.slug }).populate({
    path: 'reviews',
    fields: 'review rating user',
  });

  if (!tour) {
    return next(new AppError('There is no tour with that name.', 404));
  }

  res.status(200).render('tour', {
    title: `${tour.name} Tour`,
    tour,
  });
});

module.exports.getLoginForm = (req, res) => {
  res.status(200).render('login', {
    title: 'Login',
  });
};

module.exports.getSignupForm = (req, res) => {
  res.status(200).render('signup', {
    title: 'Signup',
  });
};

module.exports.getAccount = (req, res) => {
  res.status(200).render('account', {
    title: 'Your account',
    user: req.user,
  });
};

module.exports.getMyTours = catchAsync(async (req, res, next) => {
  const bookings = await Booking.find({ user: req.user.id }).populate(
    'associatedTour'
  );

  // const tourIDs = bookings.map((booking) => booking.tour);
  // const tours = await Tour.find({ _id: { $in: tourIDs } });

  const tours = bookings.flatMap((booking) => booking.associatedTour);

  // res.status(200).json({
  //   status: 'success',
  //   tours,
  // });

  res.status(200).render('overview', {
    title: 'My booked tours',
    tours,
    user: req.user,
  });
});
