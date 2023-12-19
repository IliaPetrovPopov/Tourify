// const catchAsync = require('../utils/catch-async');
const Review = require('../models/reviewModel');
const {
  deleteOne,
  updateOne,
  createOne,
  getOne,
  getAll,
} = require('./handlerFactory');

module.exports.setTourAndUserIDs = (req, res, next) => {
  // How to do nested routes
  if (!req.body.tour) req.body.tour = req.params.tourID;
  if (!req.body.user) req.body.user = req.user.id;

  next();
};

module.exports.getAllReviews = getAll(Review);

module.exports.getReview = getOne(Review);


module.exports.createReview = createOne(Review);

module.exports.modifyReview = updateOne(Review);

module.exports.deleteReview = deleteOne(Review);
