/* ** ** ** ** ** ** **
Google Strategy
* ** ** ** ** ** ** **/
var passport = require('passport')
, GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

module.exports = function( config ){
	console.log("GoogleStrategy loaded")
	//A. Tell http://console.developers.google.com who we are
	passport.use(new GoogleStrategy(
		//B. Config found in /config/config.js.dist
		config,
	    function(req, accessToken, refreshToken, profile, done){
			//C. Let's create a single user and bind that to one DB account
			var user = {
				email: profile.emails[0].value,
				image : profile._json.image.url,
				displayName : profile.displayName,
				google: {
					id: profile.id,
					token: accessToken
				}
			};
			//D. 
	        done(null, user);
	    }	
	))
}
