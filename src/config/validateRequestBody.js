import validator from 'validator';
import StatusCodes from '../config/statusCodeConstants';

/* global res */

/**
 * Validate request body using validator.js
 * @param {*} email 
 * @param {*} password 
 * @param {*} userName
 * @param {function} next
 * @returns {*} res
 */
export default function validateRequestBody(email, password, userName, next) {
  if (email) {
    if (!validator.isEmail(email)) {
      return res.status(StatusCodes.BAD_FIELD_AUTHENTICATION).send({
        message: 'invalid email'
      });
    }
  }

  if (password) {
    if (!validator.isLength({ min: 6, max: 30 })) {
      return res.status(StatusCodes.BAD_FIELD_AUTHENTICATION).send({
        message: 'invalid password'
      });
    }
  }

  next();
}
