import jwt from 'jsonwebtoken';
const jwtSecret = process.env.JWT_SECRET;


/**
 * middleware for token validation
 * @returns {void}
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export default function authenticationMiddleware(req, res, next) {
  const token = req.token;
  jwt.verify(token, jwtSecret, (error) => {
    if (error) {
      res.status(401).send('you are not signed in');
    }
    next();
  });
}
