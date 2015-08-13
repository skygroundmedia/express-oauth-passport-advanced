/* ** ** ** ** ** ** **
Google Strategy
* ** ** ** ** ** ** **/
var passport = require('passport')
, TwitterStrategy = require('passport-twitter').Strategy;

module.exports = function( config ){
	console.log("TwitterStrategy loaded")
	//A. Tell http://console.developers.google.com who we are
	passport.use(new TwitterStrategy(
		//B. Config found in /config/config.js.dist
		config,
	    function(req, token, tokenSecret, profile, done){
			//C. Let's create a single user and bind that to one DB account
			var user = {
				//Twitter does not send back an e-mail address
				//email: null,
				image : profile._json.profile_image_url,
				displayName : profile.displayName,
				twitter: {
					id: profile.id,
					token: token
				}
			};
			//D. 
	        done(null, user);
	    }	
	))
}
