const AppError = require('../utils/app-error');

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err) => {
  const value = err.keyValue.name;
  const message = `Duplicate field value: ${value}. Please use another value!`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input data: ${errors.join(' | ')}`;
  return new AppError(message, 400);
};

const handleJWTError = () =>
  new AppError('Invalid token. Please log in again', 401);

const handleJWTExpiredError = () =>
  new AppError('Token has expired. Please log in again', 401);

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    console.error('ERROR 💥', err);

    res.status(500).json({
      status: 'error',
      message: 'Something went wrong!',
    });
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode ?? 500;
  err.status = err.status ?? 'Error!';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    let errorCopy = { ...err };

    if (errorCopy.name === 'CastError') {
      errorCopy = handleCastErrorDB(errorCopy);
    }

    if (errorCopy.code === 11000) {
      errorCopy = handleDuplicateFieldsDB(errorCopy);
    }

    if (errorCopy.name === 'ValidationError') {
      errorCopy = handleValidationErrorDB(errorCopy);
    }

    if (errorCopy === 'JsonWebTokenError') {
      errorCopy = handleJWTError();
    }

    if (errorCopy === 'TokenExpiredError') {
      errorCopy = handleJWTExpiredError();
    }

    sendErrorProd(errorCopy, res);
  }
};
