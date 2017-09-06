import mongoose from 'mongoose';
import Local from 'passport-local';
import Twitter from 'passport-twitter';
import Facebook from 'passport-facebook';
import GitHub from 'passport-github';
import Google from 'passport-google-oauth';
import config from './config';

const User = mongoose.model('User');
const localStrategy = Local.Strategy;
const twitterStrategy = Twitter.Strategy;
const facebookStrategy = Facebook.Strategy;
const gitHubStrategy = GitHub.Strategy;
const googleStrategy = Google.OAuth2Strategy;

/**
 * @return {void}
 * @param {*} passport 
 */
export default function (passport) {
// Serialize sessions
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findOne({
      _id: id
    }, (err, user) => {
      user.email = null;
      user.facebook = null;
      user.hashed_password = null;
      done(err, user);
    });
  });

  // Use local strategy
  passport.use(new localStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  (emailArgument, password, done) => {
    User.findOne({
      email: emailArgument
    }, (err, user) => {
    // console.log('finds the user, resolves');
      if (err) {
        console.log(err);
        return done(err);
      }
      if (!user) {
        return done(null, false, {
          message: 'Unknown user'
        });
      }
      if (!user.authenticate(password)) {
        console.log('finds user but incorrect password');
        return done(null, false, {
          message: 'Invalid password'
        });
      }
      // user.email = null;
      // user.hashed_password = null;
      console.log('authentication in passport');
      done(null, user);
    });
  }
  ));

  // Use twitter strategy
  passport.use(new twitterStrategy({
    consumerKey: process.env.TWITTER_CONSUMER_KEY || config.twitter.clientID,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET || config.twitter.clientSecret,
    callbackURL: config.twitter.callbackURL
  },
  (token, tokenSecret, profile, done) => {
    User.findOne({
      'twitter.id_str': profile.id
    }, (err, user) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        user = new User({
          name: profile.displayName,
          username: profile.username,
          provider: 'twitter',
          twitter: profile._json
        });
        user.save((err) => {
          if (err) console.log(err);
          return done(err, user);
        });
      } else {
        return done(err, user);
      }
    });
  }
  ));

  // Use facebook strategy
  passport.use(new facebookStrategy({
    clientID: process.env.FB_CLIENT_ID || config.facebook.clientID,
    clientSecret: process.env.FB_CLIENT_SECRET || config.facebook.clientSecret,
    callbackURL: config.facebook.callbackURL
  },
  (accessToken, refreshToken, profile, done) => {
    User.findOne({
      'facebook.id': profile.id
    }, (err, user) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        console.log(profile);
        user = new User({
          name: profile.displayName,
          email: (profile.emails && profile.emails[0].value) || '',
          username: profile.username,
          provider: 'facebook',
          facebook: profile._json
        });
        user.save((err) => {
          if (err) console.log(err);
          user.facebook = null;
          return done(err, user);
        });
      } else {
        user.facebook = null;
        return done(err, user);
      }
    });
  }
  ));

  // Use github strategy
  passport.use(new gitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID || config.github.clientID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET || config.github.clientSecret,
    callbackURL: config.github.callbackURL
  },
  (accessToken, refreshToken, profile, done) => {
    User.findOne({
      'github.id': profile.id
    }, (err, user) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        user = new User({
          name: profile.displayName,
          email: profile.emails[0].value,
          username: profile.username,
          provider: 'github',
          github: profile._json
        });
        user.save((err) => {
          if (err) console.log(err);
          return done(err, user);
        });
      } else {
        return done(err, user);
      }
    });
  }
  ));

  //  Use google strategy
  passport.use(new googleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID || config.google.clientID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || config.google.clientSecret,
    callbackURL: config.google.callbackURL
  },
  (accessToken, refreshToken, profile, done) => {
    User.findOne({
      'google.id': profile.id
    }, (err, user) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        user = new User({
          name: profile.displayName,
          email: profile.emails[0].value,
          username: profile.username,
          provider: 'google',
          google: profile._json
        });
        user.save((err) => {
          if (err) console.log(err);
          return done(err, user);
        });
      } else {
        return done(err, user);
      }
    });
  }
  ));
}
