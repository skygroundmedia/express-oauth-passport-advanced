/* ** ** ** ** ** ** **
Google Strategy
* ** ** ** ** ** ** **/
var passport = require('passport')
, GithubStrategy = require('passport-github').Strategy;

module.exports = function( config ){
	console.log("GithubStrategy loaded")
	//A. Tell http://console.developers.google.com who we are
	passport.use(new GithubStrategy(
		//B. Config found in /config/config.js.dist
		config,
	    function(req, accessToken, refreshToken, profile, done){
			//C. Let's create a single user and bind that to one DB account
			console.log(profile)
			var user = {
				email: profile.emails[0].value,
				image : profile._json.avatar_url,
				displayName : profile._json.name,
				twitter: {
					id: profile.id,
					token: accessToken
				}
			};
			//D. 
	        done(null, user);
	    }	
	))
}
