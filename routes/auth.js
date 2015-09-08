var express = require('express');
var router = express.Router();

/* ** ** ** ** ** ** ** ** ** ** ** 
New Code Starts 
**/
var passport = require('passport')

//Google Routing
router.route('/google').get(passport.authenticate('google', {
	scope: [
		'profile',
		'email',
		'openid'
	]
}))
router.route('/google/callback').get(passport.authenticate('google', {
	successRedirect: '/users/',
	failure: '/error/'
}));


//Twitter Routing
router.route('/twitter').get(passport.authenticate('twitter'))
router.route('/twitter/callback').get(passport.authenticate('twitter', {
	successRedirect: '/users/',
	failure: '/error/'
}));



//Facebook Routing
router.route('/facebook').get(passport.authenticate('facebook', {
	scope: [
		'email'
	]
}))
router.route('/facebook/callback').get(passport.authenticate('facebook', {
	successRedirect: '/users',
	failure: '/error'
}));


//Github Routing
router.route('/github').get(passport.authenticate('github'))
router.route('/github/callback').get(passport.authenticate('github', {
	failureRedirect: '/error/'
}), function(req, res){
	//Success
	res.redirect('/users/')
});



//LinkedIn Routing
router.route('/linkedin').get(passport.authenticate('linkedin', {
	//https://developer.linkedin.com/docs/fields/full-profile
	scope: [
		'r_basicprofile',
		'r_emailaddress'
	]
}))
router.route('/linkedin/callback').get(passport.authenticate('linkedin', {
	failureRedirect: '/error/'
}), function(req, res){
	//Success
	res.redirect('/users/')
});



//Local Routing
router.route('/email').get(passport.authenticate('local'))
router.route('/email').post(passport.authenticate('local', {
	failureRedirect: '/error/'
}), function(req, res){
	//Success
	res.redirect('/users/')
});

/** 
New Code Ends 
* ** ** ** ** ** ** ** ** ** ** **/

module.exports = router;
