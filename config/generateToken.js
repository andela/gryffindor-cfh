import jwt from 'jwtwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const jwtToken = process.env.JWT_TOKEN || 'SECRET';

const generateToken = (user) => {
  const token = jwt.sign({
    data: user
  }, jwtToken, { expiresIn: '48h' });

  return token;
};

export default generateToken;

