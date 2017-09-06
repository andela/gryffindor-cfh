import { fieldValidationFnMap, inValidFieldMessage } from '../validate';
import { BAD_FIELD_AUTHENTICATION } from '../statusCodeConstants';

/**
 * middleware for validation
 * @param {object} req
 * @param {object} res
 * @param {function} next
 * @returns {void}
 */
export default function (req, res, next) {
  const invalidField = ['email', 'password', 'userName']
    .find((field) => {
      if (req.body[field]) {
        const validationFn = fieldValidationFnMap[field];
        return !validationFn.every(fn => fn(req.body[field]));
      }
      return true;
    });

  if (invalidField) {
    return res.status(BAD_FIELD_AUTHENTICATION).send({
      message: inValidFieldMessage[invalidField]
    });
  }
  next();
}
