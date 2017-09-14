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

export default mongoose.model('Region', RegionSchema);
