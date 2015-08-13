/* ** ** ** ** ** ** **
LinkedIn Strategy

Documentation
–––––––––––––––
Basic Profile Data
https://developer.linkedin.com/docs/fields/basic-profile

List of Industry codes
https://developer.linkedin.com/docs/reference/industry-codes

* ** ** ** ** ** ** **/
var passport = require('passport')
, LinkedInStrategy = require('passport-linkedin').Strategy;

module.exports = function( config ){
	console.log("LinkedInStrategy loaded")
	//A. Tell http://console.developers.google.com who we are
	passport.use(new LinkedInStrategy(
		//B. Config found in /config/config.js.dist
		config,
	    function(req, token, tokenSecret, profile, done){
			//C. Let's create a single user and bind that to one DB account
			var raw  = profile._raw
			var json = profile._json
			var user = {
				email: profile.email,
				image : json.pictureUrls.values[0],
				displayName : profile.displayName,
				linkedin: {
					id: profile.id,
					token: token,
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
