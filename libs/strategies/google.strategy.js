/* ** ** ** ** ** ** **
Google Strategy
* ** ** ** ** ** ** **/
var passport = require('passport')
, GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

module.exports = function( config ){
	//A. Tell http://console.developers.google.com who we are
	passport.use(new GoogleStrategy(
		//B. Config found in /config/config.js.dist
		config,
	    function(req, accessToken, refreshToken, profile, done){
			//C. Let's create a single user and bind that to one DB account
			var raw  = profile._raw
			var json = profile._json
			var user = {
				email:        profile.emails[0].value,
				image :       json.image.url,
				displayName : profile.displayName,
				google: {
					id:    profile.id,
					token: accessToken,
					json:  json,
					raw:   raw
				}
			};
			console.log(profile)
			//D. 
	        done(null, user);
	    }	
	))
}
