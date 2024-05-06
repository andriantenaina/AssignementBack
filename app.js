var express = require('express');
var app = express();
var db = require('./db');
let bodyParser = require('body-parser');
let assignment = require('./routes/assignments');

global.__root   = __dirname + '/'; 
// var secret = process.env.SECRET || "supersecret";

// Pour accepter les connexions cross-domain (CORS)
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

// Pour les formulaires
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// // les routes
const prefix = '/api';

app.get('/api', function (req, res) {
  res.status(200).send('API works.');
});

// http://serveur..../assignments
app.route(prefix + '/assignments')
.post(assignment.postAssignment)
.put(assignment.updateAssignment)
.get(assignment.getAssignments);

app.route(prefix + '/assignments/:id')
.get(assignment.getAssignment)
.delete(assignment.deleteAssignment);

var UserController = require(__root + 'controller/UserController');
app.use('/api/users', UserController);

var AuthController = require(__root + 'controller/AuthController');
app.use('/api/auth', AuthController);

module.exports = app;