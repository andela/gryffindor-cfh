import jwt from 'jsonwebtoken';
require('dotenv').config();


const jwtSecret = process.env.JWT_SECRET || 'SECRET';

const generateToken = (user) => {
  const token = jwt.sign({
    data: user
  }, jwtSecret, { expiresIn: '48h' });

  return token;
};

export default generateToken;

