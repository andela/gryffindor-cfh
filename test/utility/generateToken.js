import should from 'should';
import jwt from 'jsonwebtoken';
import generateToken from '../../config/generateToken';

/* global dotenv */

dotenv.config();

const jwtSecret = process.env.JWT_TOKEN || 'SECRET';

let user;

describe('GenerateToken', () => {
  before(() => {
    user = {
      username: 'testUser'
    };
  });

  it('should generate token when user object is passed', () => {
    const token = generateToken(user);
    should.exist(token);
  });

  it('should return the payload when token is decoded', () => {
    const token = generateToken(user);
    jwt.verify(token, jwtSecret, (err, decoded) => {
      decoded.should.be.eql(user);
    });
  });
});
