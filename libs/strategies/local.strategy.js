/* ** ** ** ** ** ** **
Google Strategy
* ** ** ** ** ** ** **/
var passport = require('passport')
, LocalStrategy = require('passport-local').Strategy;

module.exports = function( config ){	
	//A. Tell http://console.developers.google.com who we are
	passport.use(new LocalStrategy(
		//B. Config found in /config/config.js.dist
		config,
	    function(username, password, done){
			process.nextTick(function () {
				//C. Let's create a single user and bind that to one DB account
				/*
				User.findOne({ username: username }, function(err, user){
					if(err) return done(err)
					if(!user) return done(null, false)
					if(!user.verifyPassword(password)) return done(null, false)
				})
				*/
				console.log(username, password)
				//D.
		        done(null, user);
			});
	    }	
	))
}
