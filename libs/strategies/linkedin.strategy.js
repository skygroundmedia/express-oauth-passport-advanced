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
			///console.log("!!!", profile)
			var json = profile._json
			var user = {
				email: null,
				image : profile._json.pictureUrls.values[0],
				displayName : json.displayName,
				linkedin: profile._json
			};
			console.log(user)
			//D. 
	        done(null, user);
	    }	
	))
}