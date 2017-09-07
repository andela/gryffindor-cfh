import { isEmail, isLength, isAlphanumeric } from 'validator';

const fieldLength = {
  password: { max: 30, min: 6 },
  userName: { max: 30, min: 1 }
};

const modifiedIsLength = field => val => isLength(val, fieldLength[field] || {});

export const fieldValidationFnMap = {
  email: [isEmail],
  password: [modifiedIsLength('password')],
  userName: [modifiedIsLength('username'), isAlphanumeric]
};

export const inValidFieldMessage = {
  email: 'Email is invalid',
  password: 'Password is too short or too long',
  userName: 'Username is invalid'
};
