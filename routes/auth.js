var express = require('express');
var router = express.Router();

/* ** ** ** ** ** ** ** ** ** ** ** 
New Code Starts 
**/
var passport = require('passport')



//Google Routing
router.route('/google/callback').get(passport.authenticate('google', {
	successRedirect: '/users/',
	failure: '/error/'
}));

router.route('/google').get(passport.authenticate('google', {
	scope: [
		'https://www.googleapis.com/auth/userinfo.profile',
		'https://www.googleapis.com/auth/userinfo.email'
	]
}))



//Twitter Routing
router.route('/twitter/callback').get(passport.authenticate('twitter', {
	successRedirect: '/users/',
	failure: '/error/'
}));

router.route('/twitter').get(passport.authenticate('twitter'))



//Facebook Routing
router.route('/facebook/callback').get(passport.authenticate('facebook', {
	successRedirect: '/users',
	failure: '/error'
}));

router.route('/facebook').get(passport.authenticate('facebook', {
	scope: [
		'email'
	]
}))


//Github Routing
router.route('/github/callback').get(passport.authenticate('github', {
	failureRedirect: '/error/'
}), function(req, res){
	//Success
	res.redirect('/users/')
});

router.route('/github').get(passport.authenticate('github'))



//LinkedIn Routing
router.route('/linkedin/callback').get(passport.authenticate('linkedin', {
	failureRedirect: '/error/'
}), function(req, res){
	//Success
	res.redirect('/users/')
});

router.route('/linkedin').get(passport.authenticate('linkedin', {
	//https://developer.linkedin.com/docs/fields/full-profile
	scope: [
		'r_basicprofile',
		'r_emailaddress'
	]
}))



/** 
New Code Ends 
* ** ** ** ** ** ** ** ** ** ** **/

module.exports = router;
