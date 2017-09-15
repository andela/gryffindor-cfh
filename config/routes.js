// import async from 'async';

import { questions, question } from '../src/app/controllers/questions';
import { users, signin, signup, checkAvatar, search,
  create, avatars, sendMail, addDonation, signout } from '../src/app/controllers/users';
import { play, render } from '../src/app/controllers/index';
import { allJSON } from '../src/app/controllers/avatars';
import { all, show, answer } from '../src/app/controllers/answers';

export default function (app, passport, auth) {// eslint-disable-line
  // User Routes
  app.get('/signin', signin);
  app.get('/signup', signup);
  app.get('/chooseavatars', checkAvatar);
  app.get('/signout', signout);
  app.get('/api/search/users/:searchName', search);

  // Setting up the users api
  app.post('/users', create);
  app.post('/users/avatars', avatars);
  app.post('/api/users/emailInvite', sendMail);

  // Donation Routes
  app.post('/donations', addDonation);

  app.post('/users/session', passport.authenticate('local', {
    failureRedirect: '/signin',
    failureFlash: 'Invalid email or password.'
  }), users.session);

  app.get('/users/me', users.me);
  app.get('/users/:userId', users.show);

  // Setting the facebook oauth routes
  app.get('/auth/facebook', passport.authenticate('facebook', {
    scope: ['email'],
    failureRedirect: '/signin'
  }), users.signin);

  app.get('/auth/facebook/callback', passport.authenticate('facebook', {
    failureRedirect: '/signin'
  }), users.authCallback);

  // Setting the github oauth routes
  app.get('/auth/github', passport.authenticate('github', {
    failureRedirect: '/signin'
  }), users.signin);

  app.get('/auth/github/callback', passport.authenticate('github', {
    failureRedirect: '/signin'
  }), users.authCallback);

  // Setting the twitter oauth routes
  app.get('/auth/twitter', passport.authenticate('twitter', {
    failureRedirect: '/signin'
  }), users.signin);

  app.get('/auth/twitter/callback', passport.authenticate('twitter', {
    failureRedirect: '/signin'
  }), users.authCallback);

  // Setting the google oauth routes
  app.get('/auth/google', passport.authenticate('google', {
    failureRedirect: '/signin',
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email'
    ]
  }), users.signin);

  app.get('/auth/google/callback', passport.authenticate('google', {
    failureRedirect: '/signin'
  }), users.authCallback);

  // Finish with setting up the userId param
  app.param('userId', users.user);

  // Answer Routes
  app.get('/answers', all);
  app.get('/answers/:answerId', show);
  // Finish with setting up the answerId param
  app.param('answerId', answer);

  // Question Routes
  app.get('/questions', questions.all);
  app.get('/questions/:questionId', questions.show);
  // Finish with setting up the questionId param
  app.param('questionId', question);

  // Avatar Routes
  app.get('/avatars', allJSON);

  // Home route
  app.get('/play', play);
  app.get('/', render);
}
