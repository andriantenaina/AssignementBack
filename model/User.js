let mongoose = require('mongoose'); 
let Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-aggregate-paginate-v2');
let UserSchema = Schema({  
  id: Number,
  name: String,
  last_name: String,
  date_of_birth: String,
  status: String,
  email: String,
  password: String
});
UserSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('User', UserSchema);