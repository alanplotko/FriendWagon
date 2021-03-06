var keys = require('../keys');
var express = require('express');
var router = express.Router();
var passport = require('passport');
var GooglePlusStrategy = require('passport-google-plus');
var MongoClient = require('mongodb').MongoClient
    , assert = require('assert');

var url = 'mongodb://localhost:27017/roadtrip';
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
    res.render('users', {title : 'Users', clientID : keys.clientID});
});

router.get('/loginreturn', function(req, res, next) {
    //res.send('respond with a resource');
});

router.get('/u/:id', function(res, req, next) {
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        var collection = db.collection('users');
        collection.find({'userid': res.params.id}).toArray(function(err, docs) {
            req.send(docs);
        });
    });
});

router.get('/full', function(req, res, next) {
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        var collection = db.collection('users');
        collection.find({}).toArray(function(err, docs) {
            req.send(docs);
        });
    });
});

module.exports = router;
