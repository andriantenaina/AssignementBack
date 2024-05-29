let mongoose = require('mongoose');
let config = require('./config');
mongoose.Promise = global.Promise;
// mongoose.set('debug', true);

// remplacer toute cette chaine par l'URI de connexion à votre propre base dans le cloud s
// const uri = 'mongodb+srv://mb1:toto@cluster0.lxvcyxy.mongodb.net/assignments?retryWrites=true&w=majority&appName=Cluster0';
const uri = 'mongodb+srv://user:user123456@cluster-angular-mbds.infur5f.mongodb.net/';
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
};

mongoose.connect(uri, options)
  .then(() => {
    console.log("Connecté à la base MongoDB assignments dans le cloud !");
    console.log("at URI = " + uri);
    console.log("vérifiez with http://localhost:" + config.port + "/api/assignments que cela fonctionne")
  },
    err => {
      console.log('Erreur de connexion: ', err);
    });