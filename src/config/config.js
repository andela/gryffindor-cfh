/* eslint-disable import/no-dynamic-require, global-require */
import _ from 'underscore';

require('dotenv').config();

// Load app configuration

const mergeConfig = _.extend(
  require(`${__dirname}/../config/env/all.js`),
  require(`${__dirname}/../config/env/${process.env.NODE_ENV}.json`) || {});

export default mergeConfig;
