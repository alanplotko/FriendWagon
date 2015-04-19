var keys = require('../keys');
var express = require('express');
var router = express.Router();
var client = require('twilio')(keys.TWILIO_SID, keys.TWILIO_TOKEN);

router.post('/incoming', function(req, res, next) {
    client.messages.create({
        from: keys.TWILIO_FROM,
        body: req.body.body,
        to: keys.TIWLIO_TO,
    }, function(err, message) {
        res.send(message.sid);
    });
});

module.exports = router;
