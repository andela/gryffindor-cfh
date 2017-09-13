/**
 * Module dependencies.
 */
const mongoose = require('mongoose'),
  Schema = mongoose.Schema;


/**
* Region Schema
*/
const RegionSchema = new Schema({
  id: {
    type: Number
  },
  name: {
    type: String,
  }
});

/**
* Statics
*/
RegionSchema.statics = {
  load(id, cb) {
    this.findOne({
      id
    }).select('-_id').exec(cb);
  }
};

export default mongoose.model('Region', RegionSchema);
