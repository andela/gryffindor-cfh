/**
 * Module dependencies.
 */
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

/**
 * Games Schema
 */
const GameLog = new Schema({
  id: {
    type: Number,

  },
  players: {
    type: Array,
  },
  gameId: {
    type: Number,
  },
  winner: {
    type: String,
  },
  round: {
    type: Number
  }
});

/**
* Statics
*/
GameLog.statics = {
  load(id, cb) {
    this.findOne({
      id
    }).select('-_id').exec(cb);
  }
};

mongoose.model('GameLog', GameLog);
