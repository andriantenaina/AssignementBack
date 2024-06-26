var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
// var bodyParser = require('body-parser');

var VerifyToken = require(__root + 'middleware/VerifyToken');

// router.use(bodyParser.urlencoded({ extended: true }));
var User = require('../model/User');

// CREATES A NEW USER
router.post('/', function (req, res) {
    User.create({
            // id: req.body._id, 
            name : req.body.name,
            last_name: req.body.lastName,
            date_of_birth: req.body.date_of_birth,
            status: req.body.status,
            email : req.body.email,
            password : bcrypt.hashSync(req.body.password, 8)
        }, 
        function (err, user) {
            if (err) return res.status(500).send("There was a problem adding the information to the database.");
            res.status(200).send(user);
        });
});

// RETURNS ALL THE USERS IN THE DATABASE
router.get('/', function (req, res) {
    User.find({}, function (err, users) {
        if (err) return res.status(500).send("There was a problem finding the users.");
        res.status(200).send(users);
    });
});

// GETS A SINGLE USER FROM THE DATABASE
router.get('/:_id', function (req, res) {
    User.findById(req.params._id, function (err, user) {
        if (err) return res.status(500).send("There was a problem finding the user.");
        if (!user) return res.status(404).send("No user found.");
        res.status(200).send(user);
    });
});

// DELETES A USER FROM THE DATABASE
router.delete('/:id', function (req, res) {
    User.findByIdAndRemove(req.params._id, function (err, user) {
        if (err) return res.status(500).send("There was a problem deleting the user.");
        res.status(200).send("User: "+ user.name +" was deleted.");
    });
});

// UPDATES A SINGLE USER IN THE DATABASE
// Added VerifyToken middleware to make sure only an authenticated user can put to this route
router.put('/:id', /* VerifyToken, */ function (req, res) {
    User.findByIdAndUpdate(req.params._id, req.body, {new: true}, function (err, user) {
        if (err){
            console.log(err);
            return res.status(500).send("There was a problem updating the user.");
        } 
        res.status(200).send(user);
    });
});


module.exports = router;