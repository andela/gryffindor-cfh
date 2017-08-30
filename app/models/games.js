/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  config = require('../../config/config'),
  Schema = mongoose.Schema;

/**
 * Games Schema
 */
var GamesSchema = new Schema({
  id: {
    type: Number,

  },
  players: {
    type: Object,
  },
  gameId: {
    type: Number,
  },
  winner: {
    type: Object,
  }
});

mongoose.model('Games', GamesSchema);
