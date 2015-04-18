var keys = require('../keys');
var express = require('express');
var router = express.Router();
var passport = require('passport');
var GooglePlusStrategy = require('passport-google-plus');

passport.use(new GooglePlusStrategy({
    clientId: keys.clientID,
    clientSecret: keys.clientSecret
  },
  function(tokens, profile, done) {
    // Create or update user, call done() when complete... 
    done(null, profile, tokens);
  }
));

function signInCallback(authResult) {
  if (authResult.code) {
    $.post('/auth/google/callback', { id_token: authResult.id_token})
    .done(function(data) {
      $('#signinButton').hide();
    }); 
  } else if (authResult.error) {
    console.log('There was an error: ' + authResult.error);
  }
};

/* GET users listing. */
router.get('/', function(req, res, next) {
	//res.send('respond with a resource');
	res.render('users', {title : 'Users', clientID : keys.clientID});
});

/* GET users listing. */
router.get('/loginreturn', function(req, res, next) {
	//res.send('respond with a resource');
});


module.exports = router;

