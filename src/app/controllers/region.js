/**
 * Module dependencies.
 */
import Region from './../models/region';

/**
 * Find answer by id
 * @param {object} req
 * @param {object} res
 * @param {object} next
 * @param {object} id
 * @return {void}
 */
const allRegions = (req, res) => {
  Region.find({}).exec().then((regions) => {
    res.send(regions);
  }).catch((error) => {
    res.send(error);
  });
};
export default allRegions;
