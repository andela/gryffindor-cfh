/**
 * Module dependencies.
 */
import mongoose from 'mongoose';
import generateToken from '../../config/generateToken';
import avatarsModule from './avatars';

const User = mongoose.model('User');
const avatars = avatarsModule.all();

/**
 * Auth callback
 * @param {object} req
 * @param {object} res
 * @param {callbackfunction} next
 * @return {void}
 */
exports.authCallback = (req, res) => {
  res.redirect('/chooseavatars');
};

/**
 * Show login form
 * @param {object} req
 * @param {object} res
 * @return {void}
 */
exports.signin = (req, res) => {
  if (!req.user) {
    res.redirect('/#!/signin?error=invalid');
  } else {
    res.redirect('/#!/app');
  }
};

/**
 * Show sign up form
 * @param {object} req
 * @param {object} res
 * @return {void}
 */
exports.signup = (req, res) => {
  if (!req.user) {
    res.redirect('/#!/signup');
  } else {
    res.redirect('/#!/app');
  }
};

/**
 * Logout
 * @param {object} req
 * @param {object} res
 * @return {void}
 */
exports.signout = (req, res) => {
  req.logout();
  res.redirect('/');
};

/**
 * Session
 * @param {object} req
 * @param {object} res
 * @return {void}
 */
exports.session = (req, res) => {
  res.redirect('/');
};

/** 
 * Check avatar - Confirm if the user who logged in via passport
 * already has an avatar. If they don't have one, redirect them
 * to our Choose an Avatar page.
 * @param {object} req
 * @param {object} res
 * @return {void}
 */
exports.checkAvatar = (req, res) => {
  if (req.user && req.user._id) { // eslint-disable-line no-underscore-dangle
    User.findOne({
      _id: req.user._id // eslint-disable-line no-underscore-dangle
    })
      .exec((err, user) => {
        if (user.avatar !== undefined) {
          res.redirect('/#!/');
        } else {
          res.redirect('/#!/choose-avatar');
        }
      });
  } else {
    // If user doesn't even exist, redirect to /
    res.redirect('/');
  }
};

/**
 * Create user
 * @param {object} req
 * @param {object} res
 * @param {callbackFunction} next
 * @return {void}
 */
exports.create = (req, res, next) => {
  if (req.body.name && req.body.password && req.body.email) {
    User.findOne({
      email: req.body.email
    }).exec((err, existingUser) => {
      if (!existingUser) {
        const userObject = new User(req.body);
        // Switch the user's avatar index to an actual avatar url
        userObject.avatar = avatars[userObject.avatar];
        userObject.provider = 'local';
        userObject.save((err) => {
          if (err) {
            return res.render('/#!/signup?error=unknown', {
              errors: err.errors,
              user: userObject
            });
          }
          req.logIn(userObject, (err) => {
            if (err) return next(err);
            return res.redirect('/#!/');
          });
        });
      } else {
        return res.redirect('/#!/signup?error=existinguser');
      }
    });
  } else {
    return res.redirect('/#!/signup?error=incomplete');
  }
};

/**
 * Assign avatar to user
 * @param {object} req
 * @param {object} res
 * @return {void}
 */
exports.avatars = (req, res) => {
  // Update the current user's profile to include the avatar choice they've made

  // eslint-disable-next-line 
  if (req.user && req.user._id && req.body.avatar !== undefined &&
    /\d/.test(req.body.avatar) && avatars[req.body.avatar]) {
    User.findOne({
      _id: req.user._id // eslint-disable-line no-underscore-dangle
    })
      .exec((err, user) => {
        user.avatar = avatars[req.body.avatar];
        user.save();
      });
  }
  return res.redirect('/#!/app');
};

exports.addDonation = (req, res) => {
  if (req.body && req.user && req.user._id) { // eslint-disable-line no-underscore-dangle
    // Verify that the object contains crowdrise data
    if (req.body.amount && req.body.crowdrise_donation_id && req.body.donor_name) {
      User.findOne({
        _id: req.user._id // eslint-disable-line no-underscore-dangle
      })
        .exec((err, user) => {
          // Confirm that this object hasn't already been entered
          let duplicate = false;
          for (let i = 0; i < user.donations.length; i = +1) {
            if (user.donations[i].crowdrise_donation_id === req.body.crowdrise_donation_id) {
              duplicate = true;
            }
          }
          if (!duplicate) {
            // console.log('Validated donation');
            user.donations.push(req.body);
            user.premium = 1;
            user.save();
          }
        });
    }
  }
  res.send();
};

/**
 *  Show profile
 * @param {object} req
 * @param {object} res
 * @return {void}
 */
exports.show = (req, res) => {
  const userObject = req.profile;

  res.render('users/show', {
    title: userObject.name,
    user: userObject
  });
};

/**
 * Send User
 * @param {object} req
 * @param {object} res
 * @return {void}
 */
exports.me = (req, res) => {
  res.jsonp(req.user || null);
};

/**
 * Find user by id
 * @param {object} req
 * @param {object} res
 * @param {function} next
 * @param {number} id
 * @return {void}
 */
exports.user = (req, res, next, id) => {
  User
    .findOne({
      _id: id
    })
    .exec((err, user) => {
      if (err) return next(err);
      if (!user) return next(new Error(`Failed to load User ${id}`));
      req.profile = user;
      next();
    });
};

exports.jwtLogin = (req, res) => {
  const user = req.user;
  const generatedToken = generateToken(user);
  res.status(200).send(generatedToken);
};
