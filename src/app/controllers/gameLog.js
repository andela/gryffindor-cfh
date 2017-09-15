import mongoose from 'mongoose';
/**
 * Module dependencies
 */
import jwt from 'jsonwebtoken';
import GameLog from './../models/gameLog';
import User from './../models/user';
/**
 *
 * @return {void}
 * @export
 * @param {any} req
 * @param {any} res
 */
export const startGame = (req, res) => { // eslint-disable-line
  if (req.headers.token) {
    const playerId = jwt.decode(req.headers.token).data._id; // eslint-disable-line
    const games = new GameLog();
    games.playerId = playerId;
    games.gameId = req.params.gameId;
    games.players = req.body.players;
    games.winner = req.body.winner;
    games.round = req.body.rounds;
    games.save((error) => {
      if (error) {
        return res.status(400).json({ message: 'Error' });
      }
      User.findOneAndUpdate(
        { _id: req.body.winnerId },
        { $inc: { gamesWon: 1 } }
      ).then(() => (
        res.status(200).send({ message: 'Game saved' })
      ));
    });
  }
};

export const retrieveGameLog = (req, res) => {
  const playerId = jwt.decode(req.headers.token).data._id; // eslint-disable-line
  GameLog.find({ playerId: mongoose.Types.ObjectId(playerId) }).select('-_id').exec((err, gameLogs) => {
    if (err) {
      res.render('error', {
        status: 500
      });
    } else {
      res.send(gameLogs);
    }
  });
};

export const retrieveLeaderBoard = (req, res) => {
  User.find(
    { gamesWon: { $gt: 1 } },
    { name: 1, gamesWon: 1 }
  ).sort({ gamesWon: -1 }).select('-_id').exec((err, leaderBoard) => {
    if (err) {
      res.render('error', {
        status: 500
      });
    } else {
      res.send(leaderBoard);
    }
  });
};

export const retrieveDonations = (req, res) => {
  const playerId = jwt.decode(req.headers.token).data._id; // eslint-disable-line
  User.find({ _id: mongoose.Types.ObjectId(playerId) }).select('-_id').exec((err, user) => {
    if (err) {
      res.render('error', {
        status: 500
      });
    } else {
      res.send(user[0].donations);
    }
  });
};
