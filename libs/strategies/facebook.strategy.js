/* ** ** ** ** ** ** **
Facebook Strategy

Documentation
https://www.npmjs.com/package/passport-facebook

* ** ** ** ** ** ** **/
var passport = require('passport')
, FacebookStrategy = require('passport-facebook').Strategy;

module.exports = function( config ){
	//A. Tell http://console.developers.google.com who we are
	passport.use(new FacebookStrategy(
		//B. Config found in /config/config.js.dist
		config,
	    function(req, accessToken, refreshToken, profile, done){
			//C. Let's create a single user and bind that to one DB account
			var raw  = profile._raw
			var json = profile._json
			var user = {
				email:        json.email,
				image :       json.picture.data.url,
				displayName : json.first_name + " " + json.last_name,
				facebook: {
					id:    profile.id,
					token: accessToken,
					json:  json,
					raw:   raw
				}
			};
			console.log(user.facebook.json)
			//D. 
	        done(null, user);
	    }	
	))
}
