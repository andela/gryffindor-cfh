/**
 * Module dependencies.
 */
import Answer from './../models/answer';

/**
 * Find answer by id
 * @param {object} req
 * @param {object} res
 * @param {object} next
 * @param {object} id
 * @return {void}
 */
export const answer = (req, res, next, id) => {
  Answer.load(id, (err, ans) => {
    if (err) return next(err);
    if (!ans) return next(new Error(`Failed to load answer ${id}`));
    req.answer = ans;
    next();
  });
};

/**
 * Show an answer
 * @param {object} req
 * @param {object} res
 * @return {void}
 */
export const show = (req, res) => {
  res.jsonp(req.answer);
};

/**
 * List of Answers
 * @param {object} req
 * @param {object} res
 * @return {void}
 */
export const all = (req, res) => {
  Answer.find({ official: true }).select('-_id').exec((err, answers) => {
    if (err) {
      res.render('error', {
        status: 500
      });
    } else {
      res.jsonp(answers);
    }
  });
};


/**
 * List of Answers (for Game class)
 * @param {function} cb
 * @return {void}
 */
export const allAnswersForGame = (cb) => {
  Answer.find({ official: true }).select('-_id').exec((err, answers) => {
    if (err) {
      console.log(err);
    } else {
      cb(answers);
    }
  });
};
