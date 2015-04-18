var express = require('express');
var router = express.Router();

// GET home page
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Friendwagon' });
});

router.get('/roadtrip', function(req, res, next) {
  res.render('roadtrip', { title: 'My Road Trip' });
});

module.exports = router;
