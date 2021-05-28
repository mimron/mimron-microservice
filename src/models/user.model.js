const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('./plugins');
const { roles } = require('../config/roles');

const userSchema = mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    accountNumber: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    identityNumber: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    emailAddress: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Invalid email');
        }
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 8,
      validate(value) {
        if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
          throw new Error('Password must contain at least one letter and one number');
        }
      },
      private: true, // used by the toJSON plugin
    },
    role: {
      type: String,
      enum: roles,
      default: 'user',
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
userSchema.plugin(toJSON);
userSchema.plugin(paginate);

/**
 * Check if userName is taken
 * @param {string} userName - The user's userName
 * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */
 userSchema.statics.isUserName = async function (userName, excludeUserId) {
  const user = await this.findOne({ userName, _id: { $ne: excludeUserId } });
  return !!user;
};

/**
 * Check if accountNumber is taken
 * @param {string} accountNumber - The user's accountNumber
 * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */
 userSchema.statics.isAccountNumber = async function (accountNumber, excludeUserId) {
  const user = await this.findOne({ accountNumber, _id: { $ne: excludeUserId } });
  return !!user;
};

/**
 * Check if identityNumber is taken
 * @param {string} identityNumber - The user's identityNumber
 * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */
 userSchema.statics.isIdentityNumber = async function (identityNumber, excludeUserId) {
  const user = await this.findOne({ identityNumber, _id: { $ne: excludeUserId } });
  return !!user;
};

/**
 * Check if emailAddress is taken
 * @param {string} emailAddress - The user's emailAddress
 * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */
userSchema.statics.isEmailTaken = async function (emailAddress, excludeUserId) {
  const user = await this.findOne({ emailAddress, _id: { $ne: excludeUserId } });
  return !!user;
};

/**
 * Check if password matches the user's password
 * @param {string} password
 * @returns {Promise<boolean>}
 */
userSchema.methods.isPasswordMatch = async function (password) {
  const user = this;
  return bcrypt.compare(password, user.password);
};

userSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

/**
 * @typedef User
 */
const User = mongoose.model('User', userSchema);

module.exports = User;
