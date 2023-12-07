const User = require('../models/userModel');
const catchAsync = require('../utils/catch-async');

module.exports.getAllUsers = catchAsync(async (req, res) => {
  const users = await User.find();

  res.status(200).json({
    status: 'success',
    data: {
      users,
    },
  });
});

module.exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'Error',
    message: 'Not yet implemented!',
  });
};

module.exports.getUser = (req, res) => {
  res.status(500).json({
    status: 'Error',
    message: 'Not yet implemented!',
  });
};

module.exports.updateUser = (req, res) => {
  res.status(500).json({
    status: 'Error',
    message: 'Not yet implemented!',
  });
};

module.exports.deleteUser = (req, res) => {
  res.status(500).json({
    status: 'Error',
    message: 'Not yet implemented!',
  });
};
