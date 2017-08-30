let mongoose = require('mongoose'),
  async = require('async'),
  Games = mongoose.model('Games'),
  _ = require('underscore');


exports.startGame = (req, res) => {
  const games = new Games();
  games.gameId = req.body.gameId;
  games.players = req.body.players;
  games.winner = req.body.winner;
  games.save((error) => {
    if (error) {
      return res.send({ message: 'Error' });
    }
    return res.send({ message: 'Game saved' });
  });
};
