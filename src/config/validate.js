import { isEmail, isLength, isAlphanumeric } from 'validator';

const fieldLength = {
  password: { max: 30, min: 6 },
  username: { max: 30, min: 1 }
};

const modifiedIsLength = field => val => isLength(val, fieldLength[field] || {});

export const fieldValidationFnMap = {
  email: [isEmail],
  password: [modifiedIsLength('password')],
  username: [modifiedIsLength('username'), isAlphanumeric]
};

export const inValidFieldMessage = {
  email: 'Email is invalid',
  password: 'Password is too short or too long',
  username: 'Username is invalid'
};
