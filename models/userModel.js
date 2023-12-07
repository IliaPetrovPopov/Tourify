const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    required: [true, 'A user must have name!'],
    type: String,
  },
  email: {
    required: [true, 'A user must have email!'],
    type: String,
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please enter a valid email!'],
  },
  photo: {
    type: String,
  },
  password: {
    required: [true, 'A user must have password!'],
    type: String,
    minlength: 8,
    select: false,
  },
  passwordConfirm: {
    required: [true, 'A user must confirm his password!'],
    type: String,
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: 'Passwords are not the same!',
    },
  },
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.correctPassword = async function (candidate, userPassword) {
  return await bcrypt.compare(candidate, userPassword);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
