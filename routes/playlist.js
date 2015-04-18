var keys = require('../keys');
var express = require('express');
var router = express.Router();
var SpotifyWebApi = require('spotify-web-api-node');
	
// credentials are optional
var spotifyApi = new SpotifyWebApi({ 
 	'accessToken' : 'myAccessToken',
 	'refreshToken' : 'myRefreshToken',
 	response_type : 'code',
	'client_id' : keys.spotifyclientID,
	clientSecret : keys.spotifyclientSecret,
	redirectUri : 'http://localhost/playlist'
});

var scopes = ['playlist-modify-public', 'user-read-email', 'playlist-read-private', 'user-read-private'];
var authorizationCode = 'sa';


/* GET users listing. */
router.get('/', function(req, res, next) {
	//res.send('respond with a resource');
	//var authorizeURL = spotifyApi.createAuthorizeURL(scopes);
	dothis();
	res.render('loginreturn', {title : 'Playlist'});
});

module.exports = router;


var dothis = function()
{
	spotifyApi.authorizationCodeGrant(authorizationCode)
	  .then(function(data) {
	    spotifyApi.setAccessToken(data.body['access_token']);
	    //return spotifyApi.addTracksToPlaylist('thelinmichael', '5ieJqeLJjjI8iJWaxeBLuK', ["spotify:track:4iV5W9uYEdYUVa79Axb7Rh", "spotify:track:1301WleyT98MSxVHPZCA6M"],
	    //  {
	    //    position : 10
	    //  })
	  }).then(function(data) {
	    console.log('Added tracks to the playlist!');
	  }).catch(function(err) {
	    console.log('Something went wrong!', err.message);
	  });
}








