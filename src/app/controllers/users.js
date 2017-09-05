/**
 * Module dependencies.
 */
import nodemailer from 'nodemailer';
import smtpTransport from 'nodemailer-smtp-transport';
const mongoose = require('mongoose');
const User = mongoose.model('User');
const avatars = require('./avatars').all();

/**
   * Auth callback
   * @param {Object} req request object
   * @param {Object} res response object
   * @param {next} next object
   * @returns {void} returns void
   */
exports.authCallback = (req, res, next) => { // eslint-disable-line
  res.redirect('/chooseavatars');
};

/**
   * Show login form
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {void} returns void
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
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {void} returns void
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
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {void} returns void
   */
exports.signout = (req, res) => {
  req.logout();
  res.redirect('/');
};

/**
   * Session
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {void} returns void
   */
exports.session = (req, res) => {
  res.redirect('/');
};

/**
   * Check avatar - Confirm if the user who logged in via passport
   * already has an avatar. If they don't have one, redirect them
   * to our Choose an Avatar page.
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {void} returns void
   */
exports.checkAvatar = (req, res) => {
  if (req.user && req.user._id) { // eslint-disable-line
    User.findOne({
      _id: req.user._id// eslint-disable-line
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
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {object} returns response object
   */
exports.create = (req, res) => {
  if (req.body.name && req.body.password && req.body.email) {
    User.findOne({
      email: req.body.email
    }).exec((err, existingUser) => {
      if (!existingUser) {
        const user = new User(req.body);
        // Switch the user's avatar index to an actual avatar url
        user.avatar = avatars[user.avatar];
        user.provider = 'local';
        user.save((err) => {
          if (err) {
            return res.render('/#!/signup?error=unknown', {
              errors: err.errors,
              user
            });
          }
          req.logIn(user, (err) => {
            if (err) return next(err);// eslint-disable-line
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
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {object} returns response object
   */
exports.avatars = (req, res) => {
  // Update the current user's profile to include the avatar choice they've made
  if (req.user && req.user._id && req.body.avatar !== undefined &&// eslint-disable-line
    /\d/.test(req.body.avatar) && avatars[req.body.avatar]) {
    User.findOne({
      _id: req.user._id// eslint-disable-line
    })
      .exec((err, user) => {
        user.avatar = avatars[req.body.avatar];
        user.save();
      });
  }
  return res.redirect('/#!/app');
};

/**
   * Add user donations
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {void} returns void
   */
exports.addDonation = (req, res) => {
  if (req.body && req.user && req.user._id) {// eslint-disable-line
    // Verify that the object contains crowdrise data
    if (req.body.amount && req.body.crowdrise_donation_id && req.body.donor_name) {
      User.findOne({
        _id: req.user._id// eslint-disable-line
      })
        .exec((err, user) => {
        // Confirm that this object hasn't already been entered
          let duplicate = false;
          for (let i = 0; i < user.donations.length; i += 1) {
            if (user.donations[i].crowdrise_donation_id === req.body.crowdrise_donation_id) {
              duplicate = true;
            }
          }
          if (!duplicate) {
            console.log('Validated donation');// eslint-disable-line
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
   * Show user
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {void} returns void
   */
exports.show = (req, res) => {
  const user = req.profile;

  res.render('users/show', {
    title: user.name,
    user
  });
};

/**
   * Send user
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {void} returns void
   */
exports.me = (req, res) => {
  res.jsonp(req.user || null);
};

/**
   * Find user by id
   * @param {Object} req request object
   * @param {Object} res response object
   * @param {Object} next  object
   * @param {Object} id string
   * @returns {void} returns void
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

/**
   * Find user
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {void} returns void
   */
exports.search = (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  const name = req.params.searchName;
  // console.log(email);
  User.find({ name: new RegExp(name, 'i') }).exec((error, result) => {
    if (error) {
      return res.json(error);
    }
    return res.json(result);
  });
};


/**
   * Send email
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {void} returns void
   */
exports.sendMail = (req, res) => { // eslint-disable-line
  const transporter = nodemailer.createTransport(smtpTransport({
    service: 'gmail',
    auth: {
      user: 'postitbyyamen@gmail.com', // my mail
      pass: '123postit890'
    }
  }));
  const mailOptions = {
    from: '"Cards for Humanity" <notification@cfh.com>',
    to: req.body.To,
    subject: 'Invitation to play',
    text: `Follow the link to play: ${req.body.Link}`,
    html: `<b>Follow the link to play: ${req.body.Link}</b>`
  };

  transporter.sendMail(mailOptions, (error) => {
    if (error) {
      console.log(error); // eslint-disable-line
    }
  });
};
