/**
 * Module dependencies.
 */
/* eslint-disable no-underscore-dangle, func-names */
import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

const authTypes = ['github', 'twitter', 'facebook', 'google'];

/**
 * User Schema
 */
const UserSchema = new Schema({
  name: String,
  email: String,
  username: String,
  provider: String,
  avatar: String,
  premium: Number, // null or 0 for non-donors, 1 for everyone else (for now)
  donations: [],
  requests: { type: Array, default: [] },
  friends: { type: Array, default: [] },
  gamesWon: { type: Number, default: 0 },
  hashed_password: String,
  facebook: {},
  twitter: {},
  github: {},
  google: {}
});

/**
 * Virtuals
 */
UserSchema.virtual('password').set(function (password) {
  this._password = password;
  this.hashed_password = this.encryptPassword(password); // eslint-disable-line
}).get(function () {
  return this._password;
});

/**
 * Validations
 * @param {object} value
 * @return {int} Integer
 */
const validatePresenceOf = function (value) {
  return value && value.length;
};

// the below 4 validations only apply if you are signing up traditionally
UserSchema.path('name').validate(function (name) {
  // if you are authenticating by any of the oauth strategies, don't validate
  if (authTypes.indexOf(this.provider) !== -1) return true;
  return name.length;
}, 'Name cannot be blank');

UserSchema.path('email').validate(function (email) {
  // if you are authenticating by any of the oauth strategies, don't validate
  if (authTypes.indexOf(this.provider) !== -1) return true;
  return email.length;
}, 'Email cannot be blank');

UserSchema.path('username').validate(function (username) {
  // if you are authenticating by any of the oauth strategies, don't validate
  if (authTypes.indexOf(this.provider) !== -1) return true;
  return username.length;
}, 'Username cannot be blank');

UserSchema.path('hashed_password').validate(function (hashed_password) { // eslint-disable-line
  // if you are authenticating by any of the oauth strategies, don't validate
  if (authTypes.indexOf(this.provider) !== -1) return true;
  return hashed_password.length;
}, 'Password cannot be blank');


/**
 * Pre-save hook
 */
UserSchema.pre('save', function (next) {
  if (!this.isNew) return next();

  if (!validatePresenceOf(this.password) && authTypes.indexOf(this.provider) === -1) { next(new Error('Invalid password')); } else { next(); }
});

/**
 * Methods
 */
UserSchema.methods = {
  /**
   * Authenticate - check if the passwords are the same
   *
   * @param {String} plainText
   * @return {Boolean}
   * @api public
   */

  authenticate(plainText) {
    if (!plainText || !this.hashed_password) {
      return false;
    }
    return bcrypt.compareSync(plainText, this.hashed_password);
  },

  /**
   * Encrypt password
   * @param {String} password
   * @return {String}
   * @api public
   */

  encryptPassword(password) {
    if (!password) return '';
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  }
};

export default mongoose.model('User', UserSchema);
