/**
 * Module dependencies.
 */

/**
 * Redirect users to /#!/app (forcing Angular to reload the page)
 * @param {object} req
 * @param {object} res
 * @return {void}
 */
export const play = (req, res) => {
  if (Object.keys(req.query)[0] === 'custom') {
    res.redirect('/#!/app?custom');
  } else {
    res.redirect('/#!/app');
  }
};

/**
 * Render home page with auth user if any
 * @param {object} req
 * @param {object} res
 * @return {void}
 */
export const render = (req, res) => {
  res.render('index', {
    user: req.user ? JSON.stringify(req.user) : 'null'
  });
};
