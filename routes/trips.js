var keys = require('../keys');
var express = require('express');
var router = express.Router();
var passport = require('passport');
var GooglePlusStrategy = require('passport-google-plus');
var MongoClient = require('mongodb').MongoClient
    , assert = require('assert');

var url = 'mongodb://localhost:27017/roadtrip';
var db;
MongoClient.connect(url, function(err, database) {
    assert.equal(null, err);
    db = database;
});
// Use connect method to connect to the Server

passport.use(new GooglePlusStrategy({
    clientId: keys.clientID,
    clientSecret: keys.clientSecret
},

function(tokens, profile, done) {
    // Create or update user, call done() when complete...
    done(null, profile, tokens);
}));

router.get('/', function(req, res, next) {
    //res.send('respond with a resource');
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        var collection = db.collection('trips');
        collection.find().toArray(function(err, docs) {
            res.send(docs);
        });
    });
});

router.get('/:id', function(req, res, next) {
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        var collection = db.collection('trips');
        collection.find({'userid': req.params.id}).toArray(function(err, docs) {
            res.send(docs);
        });
    });
});

router.post('/add',function(req, res, next){
    var doctoadd = {"origin" : req.body.startPlace,
        "destination" : req.body.endPlace,
    "userid" : req.body.loggeduser,
    "time" : req.body.calendar,
    "seats" : req.body.seats,
    "riders" : []
    }
    var usertoadd = {
    "userid" : req.body.loggeduser,
    "name" : "Brick Hacker",
    "phonenum" : "123456789"
    }
    var collection = db.collection('trips');
    console.log(req.body);
    var usercol = db.collection('users');
    collection.insert(doctoadd, function(err, records){
        console.log("Record added as "+records);
    });
    usercol.insert(usertoadd, function(err, records){
        console.log("Record added as "+records);
    });
    res.redirect('/roadtrip/' + req.body.loggeduser);
});

module.exports = router;









