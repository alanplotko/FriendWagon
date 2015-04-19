var keys = require('../keys');
var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient
    , assert = require('assert');

var client = require('twilio')(keys.TWILIO_SID, keys.TWILIO_TOKEN);

var url = 'mongodb://localhost:27017/roadtrip';
var db;
MongoClient.connect(url, function(err, database) {
    assert.equal(null, err);
    db = database;
});

router.post('/incoming', function(req, res, next) {
    var collection = db.collection('users');
    collection.find({'phonenum': body.from}).toArray(function(err,records) {
        console.log(records);
    });
    client.messages.create({
        to: keys.TWILIO_TO,
        from: keys.TWILIO_FROM,
        body: req.body.body
    }, function(err, message) {
        console.log(err);
        res.send("hey");
    });
});

module.exports = router;
