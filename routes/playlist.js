var keys = require('../keys');
var express = require('express');
var router = express.Router();
var SpotifyWebApi = require('spotify-web-api-node');
	
// credentials are optional
var spotifyApi = new SpotifyWebApi({
	clientId : keys.spotifyclientID,
	clientSecret : keys.spotifyclientSecret,
	redirectUri : 'http://localhost/playlist'
});

var f = function()
{
	spotifyApi.getUser('gabe1118')
		.then(function(data) {
			console.log('Some information about this user', data.body);
		}, function(err) {
			console.log('Something went wrong!', err);
		});
}

/* GET users listing. */
router.get('/', function(req, res, next) {
	//res.send('respond with a resource');

	var scopes = ['playlist-modify-public', 'user-read-email', 'playlist-read-private'],
	    redirectUri = 'http://localhost/playlist',
	    clientId = keys.spotifyclientID,
	    state = 'some-state-of-my-choice';

	//f();
	var authorizeURL = spotifyApi.createAuthorizeURL(scopes, state);
	getAccessToken()

	res.render('loginreturn', {title : 'Users'});
});

module.exports = router;