import jwt from 'jsonwebtoken';
const jwtSecret = process.env.JWT_SECRET || 'SECRET';


/**
 * middleware for token validation
 * @returns {void}
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export default function authMiddleware(req, res, next) {
  const token = req.headers.token;
  if (!token) {
    return res.status(403).send('Not allowed');
  }
  jwt.verify(token, jwtSecret, (error, decoded) => {
    if (error) {
      if (error.message === 'jwt expired') {
        return res.status(401).send('Token has expired');
      }
      return res.status(401).send('Invalid token');
    }
    req.decoded = decoded;
    next();
  });
}
