/* ** ** ** ** ** ** **
Passport Config

This is where you load all of your strategies
* ** ** ** ** ** ** **/
var express = require('express')
, passport  = require('passport')

module.exports = function( app, config ){
	//A. 
	app.use(passport.initialize());
	app.use(passport.session())

	//B. This is what Passport uses to place a user object into the session
	passport.serializeUser(function(user, done){
		//Done with no errors and just user id
		done(null, user)
	})

	//C. Deserialize is what Passport uses to pull a user out of a session
	passport.deserializeUser(function(user, done){
		done(null,user)
	})	

	//D. Google Strategy
	require('./strategies/google.strategy')( config.strategies.google );
	
	//E. Twitter Strategy
	require('./strategies/twitter.strategy')( config.strategies.twitter );
	
	//F. Facebook Strategy
	require('./strategies/facebook.strategy')( config.strategies.facebook );

	//F. Github Strategy
	require('./strategies/github.strategy')( config.strategies.github );

	//F. LinkedIn Strategy
	require('./strategies/linkedin.strategy')( config.strategies.linkedin );
}
