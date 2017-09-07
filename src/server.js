/**
 * Module dependencies.
 */
import express from 'express';
import fs from 'fs';
import passport from 'passport';
import logger from 'mean-logger';
import io from 'socket.io';
import mongoose from 'mongoose';
import config from './config/config';
import db from './config/init'; // eslint-disable-line
import passportConfig from './config/passport';
import expressConfig from './config/express';
import routeConfig from './config/routes';
import socketConfig from './config/socket/socket';
import auth from './config/middlewares/authorization';
/**
 * Main application entry file.
 * Please note that the order of loading is important.
 */
const app = express();

// Bootstrap models
const modelsPath = `${__dirname}/app/models`;
const walk = (path) => {
  fs.readdirSync(path).forEach((file) => {
    const newPath = `${path}/${file}`;
    const stat = fs.statSync(newPath);
    if (stat.isFile()) {
      if (/(.*)\.(js|coffee)/.test(file)) {
        require(newPath);   // eslint-disable-line
      }
    } else if (stat.isDirectory()) {
      walk(newPath);
    }
  });
};
walk(modelsPath);

// bootstrap passport config
passportConfig(passport);

// express settings
expressConfig(app, passport, mongoose);

// Bootstrap routes
routeConfig(app, passport, auth);

// Start the app by listening on <port>
const port = config.port;
const server = app.listen(port);
const ioObj = io.listen(server, { log: false });
// game logic handled here
socketConfig(ioObj);
console.log(`Express app started on port ${port}`); // eslint-disable-line

// Initializing logger
logger.init(app, passport, mongoose);

// expose app
export default app;
