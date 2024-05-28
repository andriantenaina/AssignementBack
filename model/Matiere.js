let mongoose = require('mongoose'); 
let Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-aggregate-paginate-v2');
let MatiereSchema = Schema({  
  id: Number,
  code: String,
  nom: String,
  description: String,
  id_user: String,
  image_name: String
});
MatiereSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Matiere', MatiereSchema);