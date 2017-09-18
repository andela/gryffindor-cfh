import jwt from 'jsonwebtoken';
const jwtSecret = process.env.JWT_SECRET || 'SECRET';


/**
 * middleware for token validation
 * @returns {void}
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export default function authenticationMiddleware(req, res, next) {
  const token = req.headers.token;
  if (!token) {
    res.status(403).send('Not allowed');
  }
  jwt.verify(token, jwtSecret, (error) => {
    if (error) {
      return res.status(401).send('token has expired');
    }
    next();
  });
}
