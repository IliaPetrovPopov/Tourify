const User = require('../models/userModel');
const AppError = require('../utils/app-error');
const catchAsync = require('../utils/catch-async');
const { deleteOne, updateOne, getOne, getAll } = require('./handlerFactory');

const filterObj = (object, ...allowedFields) => {
  return Object.keys(object).reduce((accumulator, element) => {
    if (allowedFields.includes(element)) {
      accumulator[element] = object[element];
    }

    return accumulator;
  }, {});
};

module.exports.updateMe = catchAsync(async (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'You cannot update your password from here. Please use /updatePassword route to do so!',
        400
      )
    );
  }

  const filteredBody = filterObj(req.body, 'name', 'email');

  const updatedUser = await User.findByIdAndUpdate(req.user._id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser,
    },
  });
});

module.exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user._id, {
    active: false,
  });

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

module.exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'Error',
    message:
      'This route is not defined and never will be! Please use /signup instead',
  });
};

module.exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

module.exports.getAllUsers = getAll(User);

module.exports.getUser = getOne(User);

module.exports.updateUser = updateOne(User);

module.exports.deleteUser = deleteOne(User);
