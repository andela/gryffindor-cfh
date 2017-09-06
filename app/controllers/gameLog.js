/**
 * Module dependencies
 */
import mongoose from 'mongoose';
const GameLog = mongoose.model('GameLog');

/**
 * Create gamelog controller
 */

exports.startGame((req, res) => {
  const games = new GameLog();
  games.gameId = req.body.gameId;
  games.players = req.body.players;
  games.winner = req.body.winner;
  games.save((error) => {
    if (error) {
      return res.status(400).json({ message: 'Error' });
    }
    return res.status(200).send({ message: 'Game saved' });
  });
});

