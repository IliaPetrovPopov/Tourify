// import { Request } from 'express';
// import { FileFilterCallback, StorageEngine } from 'multer';

// export interface ExtendedRequest extends Request {
//   file: Express.Multer.File;
//   user: {
//     _id: string;
//     id: string;
//     name: string;
//     email: string;
//     password: string;
//     passwordConfirm: string;
//     passwordChangedAt: Date;
//     role: string;
//   };
// }

// export interface MulterUpload {
//   storage: StorageEngine;
//   fileFilter: (
//     req: Request,
//     file: Express.Multer.File,
//     cb: FileFilterCallback
//   ) => void;
//   single(fieldname: string): void;
// }
