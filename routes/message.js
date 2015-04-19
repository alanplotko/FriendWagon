var keys = require('../keys');
var express = require('express');
var router = express.Router();
var client = require('twilio')(keys.TWILIO_SID, keys.TWILIO_TOKEN);

router.get('/incoming', function(req, res, next) {
    console.log(req.body);
});

module.exports = router;
