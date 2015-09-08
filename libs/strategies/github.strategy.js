/* ** ** ** ** ** ** **
Google Strategy
* ** ** ** ** ** ** **/
var passport = require('passport')
, GithubStrategy = require('passport-github').Strategy;

module.exports = function( config ){
	//A. Tell http://console.developers.google.com who we are
	passport.use(new GithubStrategy(
		//B. Config found in /config/config.js.dist
		config,
	    function(req, accessToken, refreshToken, profile, done){
			//C. Let's create a single user and bind that to one DB account
			console.log(profile)
			var raw  = profile._raw
			var json = profile._json
			var user = {
				email:        profile.emails[0].value,
				image :       json.avatar_url,
				displayName : json.name,
				github: {
					id:    profile.id,
					token: accessToken,
					json:  json,
					raw:   raw
				}
			};
			console.log(user.github.json)
			//D. 
	        done(null, user);
	    }	
	))
}
