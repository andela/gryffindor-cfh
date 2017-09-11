/**
 * Module dependencies.
 */
import express from 'express';
import helpers from 'view-helpers';
import path from 'path';
import config from './config';

/**
 * Define express configuration
 * @param {*} app
 * @param {*} passport
 * @param {*} mongoose
 * @return {void}
 */
export default function expressConfig(app, passport) {
  app.set('showStackError', true);

  // Should be placed before express.static
  app.use(express.compress({
    filter(req, res) {
      return (/json|text|javascript|css/).test(res.getHeader('Content-Type'));
    },
    level: 9
  }));

  // Setting the fav icon and static folder
  app.use(express.favicon());
  app.use(express.static(`${config.root}/public`));

  // Don't use logger for test env
  if (process.env.NODE_ENV !== 'test') {
    app.use(express.logger('dev'));
  }

  // Set views path, template engine and default layout
  app.set('views', path.resolve(__dirname, './../app/views'));
  app.set('view engine', 'jade');

  // Enable jsonp
  app.enable('jsonp callback');

  app.configure(() => {
    // cookieParser should be above session
    app.use(express.cookieParser());

    // bodyParser should be above methodOverride
    app.use(express.bodyParser());
    app.use(express.methodOverride());

    // dynamic helpers
    app.use(helpers(config.app.name));

    // use passport session
    app.use(passport.initialize());

    // routes should be at the last
    app.use(app.router);

    // Assume "not found" in the error msgs is a 404.
    // this is somewhat silly, but valid, you can do whatever you like,
    // set properties, use instanceof etc.
    app.use((err, req, res, next) => {
      // Treat as 404
      if (~err.message.indexOf('not found')) return next(); // eslint-disable-line

      // Log it
      console.error(err.stack);

      // Error page
      res.status(500).render('500', {
        error: err.stack
      });
    });

    // Assume 404 since no middleware responded
    app.use((req, res) => {
      res.status(404).render('404', {
        url: req.originalUrl,
        error: 'Not found'
      });
    });
  });
}
