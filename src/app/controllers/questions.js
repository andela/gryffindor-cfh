/**
 * Module dependencies.
 */
import Question from './../models/question';

/**
 * Find question by id
 * @param {object} req
 * @param {object} res
 * @param {object} next
 * @param {object} id
 * @return {void}
 */
export const question = (req, res, next, id) => {
  Question.load(id, (err, ques) => {
    if (err) return next(err);
    if (!ques) return next(new Error(`Failed to load question ${id}`));
    req.question = ques;
    next();
  });
};

/**
 * Show a question
 * @param {object} req
 * @param {object} res
 * @return {void}
 */
export const show = (req, res) => {
  res.jsonp(req.question);
};

/**
 * List of Questions
 * @param {object} req
 * @param {object} res
 * @return {void}
 */
export const all = (req, res) => {
  Question.find({ official: true, numAnswers: { $lt: 3 } }).select('-_id').exec((err, questions) => {
    if (err) {
      res.render('error', {
        status: 500
      });
    } else {
      res.jsonp(questions);
    }
  });
};

/**
 * List of Questions (for Game class)
 * @param {function} cb
 * @return {void}
 */
export const allQuestionsForGame = (cb) => {
  Question.find({ official: true, numAnswers: { $lt: 3 } }).select('-_id').exec((err, questions) => {
    if (err) {
      console.log(err);
    } else {
      cb(questions);
    }
  });
};
