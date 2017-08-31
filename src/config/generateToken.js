import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const jwtSecret = process.env.JWT_TOKEN || 'SECRET';

const generateToken = (user) => {
  const token = jwt.sign({
    data: user
  }, jwtSecret, { expiresIn: '48h' });

  return token;
};

export default generateToken;

