var keys = require('../keys');
var express = require('express');
var router = express.Router();
var client = require('twilio')(keys.TWILIO_SID, keys.TWILIO_TOKEN);

router.post('/incoming', function(req, res, next) {
    client.messages.create({
        to: keys.TIWLIO_TO,
        from: keys.TWILIO_FROM,
        body: req.body.body
    }, function(err, message) {
        console.log(err);
        res.send("hey");//message.sid);
    });
});

module.exports = router;
