import validator from 'validator';

/**
 * function to validate input fields
 * @param {*} email 
 * @param {*} password 
 * @param {*} username 
 * @return {boolean} true/false
 */
export default function (email, password, username) {
  if (email) {
    if (!validator.isEmail(email)) {
      return { status: false, message: 'Email is invalid' };
    }
  }
  if (password) {
    if (!validator.isLength(password, { max: 30, min: 6 })) {
      return { status: false, message: 'Password is too short' };
    }
  }
  if (username) {
    if (!validator.isLength(username, { max: 30, min: 1 })) {
      return { status: false, message: 'Username is invalid' };
    }

    if (!validator.isAlphanumeric(username)) {
      return { status: false, message: 'Username is invalid' };
    }
  }

  return { status: true, message: 'Input fields are valid' };
}
