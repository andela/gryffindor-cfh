import should from 'should'; // eslint-disable-line
import { fieldValidationFnMap } from '../../src/config/validate';

describe('ValidationMiddleware', () => {
  const goodEmail = 'email@email.com';
  const badEmail = 'emailatemail.com';

  const goodPassword = 'isatleastsixcharacters';
  const badPassword = 'isnot';

  const goodUsername = 'longenough123';
  const badUsername = '';

  it('should not return false status when email is not email', () => {
    const validationConstraints = fieldValidationFnMap.email;
    const response = validationConstraints.every(fn => fn(badEmail));
    response.should.be.eql(false);
  });

  it('should not return false status when email is not entered', () => {
    const validationConstraints = fieldValidationFnMap.email;
    const response = validationConstraints.every(fn => fn(''));
    (response).should.be.eql(false);
  });

  it('should return false when email and password are correct', () => {
    let validationConstraints = fieldValidationFnMap.email;
    let response = validationConstraints.every(fn => fn(goodEmail));
    (response).should.not.be.eql(false);
    validationConstraints = fieldValidationFnMap.password;
    response = validationConstraints.every(fn => fn(goodPassword));
    (response).should.not.be.eql(false);
  });

  it('should not return false when password is bad', () => {
    const validationConstraints = fieldValidationFnMap.password;
    const response = validationConstraints.every(fn => fn(badPassword));
    (response).should.be.eql(false);
  });

  it('should not return false status in response when username is bad', () => {
    const validationConstraints = fieldValidationFnMap.username;
    const response = validationConstraints.every(fn => fn(badUsername));
    (response).should.be.eql(false);
  });

  it('should return true status in response when email, password and username are correct', () => {
    let validationConstraints = fieldValidationFnMap.email;
    let response = validationConstraints.every(fn => fn(goodEmail));
    (response).should.be.eql(true);
    validationConstraints = fieldValidationFnMap.password;
    response = validationConstraints.every(fn => fn(goodPassword));
    (response).should.be.eql(true);
    validationConstraints = fieldValidationFnMap.username;
    response = validationConstraints.every(fn => fn(goodUsername));
    (response).should.be.eql(true);
  });
});
