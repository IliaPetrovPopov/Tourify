const multer = require('multer');
const User = require('../models/userModel');
const AppError = require('../utils/app-error');
const catchAsync = require('../utils/catch-async');
const { deleteOne, updateOne, getOne, getAll } = require('./handlerFactory');
const sharp = require('sharp');

// const multerStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'public/img/users');
//   },
//   filename: (req, file, cb) => {
//     const extension = file.mimetype.split('/')[1];
//     cb(null, `user-${req.user.id}-${Date.now()}.${extension}`);
//   },
// });

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload only images!', 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

module.exports.uploadUserPhoto = upload.single('photo');

module.exports.resizeUserPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;
  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({
      quality: 90,
    })
    .toFile(`public/img/users/${req.file.filename}`);

  next();
});

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
  if (req.file) filteredBody.photo = req.file.filename;

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

/* Typescript practice */

// import { NextFunction, Request, Response } from 'express';
// import { FileFilterCallback, StorageEngine } from 'multer';
// import { ExtendedRequest, MulterUpload } from '../interfaces/user';

// const multer = require('multer');
// const User = require('../models/userModel');
// const AppError = require('../utils/app-error');
// const catchAsync = require('../utils/catch-async');
// const { deleteOne, updateOne, getOne, getAll } = require('./handlerFactory');
// const sharp = require('sharp');

// // const multerStorage = multer.diskStorage({
// //   destination: (req, file, cb) => {
// //     cb(null, 'public/img/users');
// //   },
// //   filename: (req, file, cb) => {
// //     const extension = file.mimetype.split('/')[1];
// //     cb(null, `user-${req.user.id}-${Date.now()}.${extension}`);
// //   },
// // });

// const multerStorage: StorageEngine = multer.memoryStorage();

// const multerFilter = (
//   req: Request,
//   file: Express.Multer.File,
//   cb: FileFilterCallback
// ): void => {
//   if (file.mimetype.startsWith('image')) {
//     cb(null, true);
//   } else {
//     cb(new AppError('Not an image! Please upload only images!', 400), false);
//   }
// };

// const upload: MulterUpload = multer({
//   storage: multerStorage,
//   fileFilter: multerFilter,
// });

// module.exports.uploadUserPhoto = upload.single('photo');

// module.exports.resizeUserPhoto = catchAsync(
//   async (req: ExtendedRequest, res: Response, next: NextFunction): Promise<void> => {
//     if (!req .file) return next();

//     req.file.filename = `user-${
//       req.user.id
//     }-${Date.now()}.jpeg`;
//     await sharp(req.file.buffer)
//       .resize(500, 500)
//       .toFormat('jpeg')
//       .jpeg({
//         quality: 90,
//       })
//       .toFile(`public/img/users/${req.file.filename}`);

//     next();
//   }
// );

// const filterObj = <T extends object>(
//   object: T,
//   ...allowedFields: (keyof T)[]
// ): Partial<T> => {
//   return Object.keys(object).reduce((accumulator, element) => {
//     if (allowedFields.includes(element as keyof T)) {
//       accumulator[element as keyof T] = object[element as keyof T];
//     }

//     return accumulator;
//   }, {} as Partial<T>);
// };

// module.exports.updateMe = catchAsync(async (req: ExtendedRequest, res: Response, next: NextFunction): Promise<void> => {
//   if (req.body.password || req.body.passwordConfirm) {
//     return next(
//       new AppError(
//         'You cannot update your password from here. Please use /updatePassword route to do so!',
//         400
//       )
//     );
//   }
//   const filteredBody = filterObj(req.body, 'name', 'email');
//   if (req.file) filteredBody.photo = req.file.filename;
 
//   const updatedUser = await User.findByIdAndUpdate(req.user._id, filteredBody, {
//     new: true,
//     runValidators: true,
//   });

//   res.status(200).json({
//     status: 'success',
//     data: {
//       user: updatedUser,
//     },
//   });
// });

// module.exports.deleteMe = catchAsync(async (req: ExtendedRequest, res: Response, next: NextFunction): Promise<void> => {
//   await User.findByIdAndUpdate(req.user._id, {
//     active: false,
//   });

//   res.status(204).json({
//     status: 'success',
//     data: null,
//   });
// });

// module.exports.createUser = (req: Request, res: Response): void => {
//   res.status(500).json({
//     status: 'Error',
//     message:
//       'This route is not defined and never will be! Please use /signup instead',
//   });
// };

// module.exports.getMe = (req: ExtendedRequest, res: Response, next: NextFunction): void => {
//   req.params.id = req.user.id;
//   next();
// };

// module.exports.getAllUsers = getAll(User);

// module.exports.getUser = getOne(User);

// module.exports.updateUser = updateOne(User);

// module.exports.deleteUser = deleteOne(User);

