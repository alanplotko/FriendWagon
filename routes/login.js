var client_id = '66908937193-lino73g5jggfpnj6glqlrf9qtvjucmaa.apps.googleusercontent.com';
var redirect_uri = 'http://s4.jagels.io:3000/callback';
var querystring = require('querystring');
var express = require('express');
var router = express.Router();

//login for spotify
router.get('/login', function(req, res) {

  var state = generateRandomString(16);
  res.cookie(stateKey, state);

  // your application requests authorization
  var scope = 'playlist-modify-public user-read-email playlist-read-private user-read-private';
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state
    }));
});

module.exports = router;