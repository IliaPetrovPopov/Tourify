const Tour = require('../models/tourModel');
const catchAsync = require('../utils/catch-async');

module.exports.getOverview = catchAsync(async (req, res, next) => {
  const tours = await Tour.find();

  res.status(200).render('overview', {
    title: 'All Tours',
    tours
  });
});

module.exports.getTour = (req, res) => {
  res.status(200).render('tour', {
    title: 'The Bakoville',
  });
};
