import {
  signin,
  signout,
  signup,
  checkAvatar,
  avatarsChoice,
  addDonation,
  show,
  me,
  authCallback,
  user,
  jwtLogin,
  session,
  create
} from '../app/controllers/users';
import answers from '../app/controllers/answers';
import questions from '../app/controllers/questions';
import avatars from '../app/controllers/avatars';
import index from '../app/controllers/index';
import fieldValidationMiddleware from './middlewares/fieldValidationMiddleware';


/**
 * routes for cfh
 * @param {*} app 
 * @param {*} passport 
 * @param {*} auth 
 * @returns {void}
 */
export default function (app, passport, auth) {  // eslint-disable-line 
  app.get('/signin', signin);
  app.get('/signup', signup);
  app.get('/chooseavatars', checkAvatar);
  app.get('/signout', signout);

  // Setting up the users api
  app.post('/users', create);
  app.post('/users/avatars', avatarsChoice);

  // Donation Routes
  app.post('/donations', addDonation);

  app.post('/users/session', passport.authenticate('local', {
    failureRedirect: '/signin',
    failureFlash: 'Invalid email or password.'
  }), session);

  app.get('/users/me', me);
  app.get('/users/:userId', show);

  // Setting the facebook oauth routes
  app.get('/auth/facebook', passport.authenticate('facebook', {
    scope: ['email'],
    failureRedirect: '/signin'
  }), signin);

  app.get('/auth/facebook/callback', passport.authenticate('facebook', {
    failureRedirect: '/signin'
  }), authCallback);

  // Setting the github oauth routes
  app.get('/auth/github', passport.authenticate('github', {
    failureRedirect: '/signin'
  }), signin);

  app.get('/auth/github/callback', passport.authenticate('github', {
    failureRedirect: '/signin'
  }), authCallback);

  // Setting the twitter oauth routes
  app.get('/auth/twitter', passport.authenticate('twitter', {
    failureRedirect: '/signin'
  }), signin);

  app.get('/auth/twitter/callback', passport.authenticate('twitter', {
    failureRedirect: '/signin'
  }), authCallback);

  // Setting the google oauth routes
  app.get('/auth/google', passport.authenticate('google', {
    failureRedirect: '/signin',
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email'
    ]
  }), signin);

  app.get('/auth/google/callback', passport.authenticate('google', {
    failureRedirect: '/signin'
  }), authCallback);

  // Finish with setting up the userId param
  app.param('userId', user);

  // Answer Routes
  app.get('/answers', answers.all);
  app.get('/answers/:answerId', answers.show);
  // Finish with setting up the answerId param
  app.param('answerId', answers.answer);

  // Question Routes
  app.get('/questions', questions.all);
  app.get('/questions/:questionId', questions.show);
  // Finish with setting up the questionId param
  app.param('questionId', questions.question);

  // Avatar Routes
  app.get('/avatars', avatars.allJSON);

  // Home route
  app.get('/play', index.play);
  app.get('/', index.render);

  // New routes to use jwt authentication
  app.post('/api/auth/login', fieldValidationMiddleware,
    passport.authenticate('local', {
      session: false,
      failureRedirect: '/login',
      failureFlash: 'Invalid email or password.'
    }),
    jwtLogin);
}
