import should from 'should'; // eslint-disable-line 
import validator from '../../config/validate';

describe('ValidatorMiddleware', () => {
  const goodEmail = 'email@email.com';
  const badEmail = 'emailatemail.com';

  const goodPassword = 'isatleastsixcharacters';
  const badPassword = 'isnot';

  const goodUsername = 'longenough123';
  const badUsername = '';

  it('should return false status in response when email is not email', () => {
    const response = validator(badEmail, goodPassword);
    (response.status).should.be.eql(false);
  });

  it('should return false status in response when email is not entered', () => {
    const response = validator('', goodPassword);
    (response.status).should.be.eql(false);
  });

  it('should return true status in response when email and password are correct', () => {
    const response = validator(goodEmail, goodPassword);
    (response.status).should.be.eql(true);
  });

  it('should return false status in response when password is bad', () => {
    const response = validator(goodEmail, badPassword);
    (response.status).should.be.eql(false);
  });

  it('should return false status in response when username is bad', () => {
    const response = validator(goodEmail, goodPassword, badUsername);
    (response.status).should.be.eql(false);
  });

  it('should return true status in response when email, password and username are correct', () => {
    const response = validator(goodEmail, goodPassword, goodUsername);
    (response.status).should.be.eql(true);
  });
});
