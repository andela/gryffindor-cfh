import validate from '../validate';

/**
 * middleware for validation
 * @param {object} req
 * @param {object} res
 * @param {function} next
 * @returns {void}
 */
export default function (req, res, next) {
  const email = req.body.email;
  const password = req.body.password;

  const resultFromValidation = validate(email, password);
  if (!resultFromValidation.status) {
    return res.status(400).send({
      message: resultFromValidation.message
    });
  }
  next();
}
