/* ** ** ** ** ** ** **
Facebook Strategy

Documentation
https://www.npmjs.com/package/passport-facebook

* ** ** ** ** ** ** **/
var passport = require('passport')
, FacebookStrategy = require('passport-facebook').Strategy;

module.exports = function( config ){
	console.log("FacebookStrategy loaded")
	//A. Tell http://console.developers.google.com who we are
	passport.use(new FacebookStrategy(
		//B. Config found in /config/config.js.dist
		config,
	    function(req, accessToken, refreshToken, profile, done){
			//C. Let's create a single user and bind that to one DB account
			console.log(profile)
			var user = {
				email: profile.emails,
				//Facebook does not return an image from an oAuth call
				image : null,
				displayName : profile.displayName,
				facebook: {
					id: profile.id,
					username: profile.username,
					token: accessToken, 
					gender: profile.gender,
					url: profile.profileUrl
				}
			};
			//D. 
	        done(null, user);
	    }	
	))
}
