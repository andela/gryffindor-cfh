import {
  signin, signout, signup,
  checkAvatar, avatarsChoice, addDonation,
  show, me, authCallback, user,
<<<<<<< HEAD
  jwtLogin, session, create, search, sendMail,
  signupJWT, getFriends, getRequests
=======
  jwtLogin, session, create, search, sendMail, signupJWT
>>>>>>> add more regions
} from '../app/controllers/users';
import { all as allAnswers, show as showAnswers, answer as getAnswer } from '../app/controllers/answers';
import { all as allQuestions, show as showQuestion, question as getQuestion } from '../app/controllers/questions';
import { allJSON } from '../app/controllers/avatars';
import { play, render } from '../app/controllers/index';
import { startGame } from '../app/controllers/gameLog';
import fieldValidationMiddleware from './middlewares/fieldValidationMiddleware';
import authMiddleware from './middlewares/authentication';


/**
 * routes for cfh
 * @param {*} app
 * @param {*} passport
 * @param {*} auth
 * @returns {void}
 */
export default function(app, passport, auth) {  // eslint-disable-line
  app.get('/signin', signin);
  app.get('/signup', signup);
  app.get('/chooseavatars', checkAvatar);
  app.get('/signout', signout);
  app.get('/api/search/users/:searchName', authMiddleware, search);
  app.post('/api/users/emailInvite', sendMail);
  app.post('/api/auth/signup', fieldValidationMiddleware, signupJWT);

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

  app.post('/api/auth/signup', fieldValidationMiddleware, signupJWT);

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
  app.get('/answers', allAnswers);
  app.get('/answers/:answerId', showAnswers);
  // Finish with setting up the answerId param
  app.param('answerId', getAnswer);

  // Question Routes
  app.get('/questions', allQuestions);
  app.get('/questions/:questionId', showQuestion);
  // Finish with setting up the questionId param
  app.param('questionId', getQuestion);

  // Avatar Routes
  app.get('/avatars', allJSON);

  // Home route
  app.get('/play', play);
  app.get('/', render);

  // New routes to use jwt authentication
  app.post('/api/auth/login', fieldValidationMiddleware,
    (req, res, next) => {
      passport.authenticate('local', (err, userStatus) => {
        if (err) {
          return res.status(500).json({
            message: 'Please try again'
          });
        }
        if (!userStatus) {
          return res.status(401).send({
            message: 'Invalid email or password'
          });
        }
        req.user = userStatus;
        next();
      })(req, res, next);
    },
    jwtLogin);

<<<<<<< HEAD
  app.post('/api/auth/friends', getFriends);
  app.post('/api/auth/requests', getRequests);
=======
  app.post('/api/games/:id/start', startGame);
>>>>>>> Feature/150438328/create and start new game (#31)
}
