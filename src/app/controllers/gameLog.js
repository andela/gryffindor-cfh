/**
 * Module dependencies
 */
import GameLog from '../controllers/gameLog';
/**
 * 
 * @return {void}
 * @export
 * @param {any} req 
 * @param {any} res 
 */
export const startGame = (req, res) => { // eslint-disable-line
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
};
