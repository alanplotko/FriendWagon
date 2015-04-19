var express = require('express');
var router = express.Router();

// GET home page
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Friendwagon' });
});

router.get('/create', function(req, res, next) {
  res.render('create-roadtrip', { title: 'Create Road Trip' });
});

router.get('/search', function(req, res, next) {
  res.render('search-form', { title: 'Search Road Trips' });
});

module.exports = router;
