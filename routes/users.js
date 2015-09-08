var express = require('express');
var router = express.Router();

/* ** ** ** ** ** ** ** ** ** ** ** 
Make sure we have a user signed in 
**/
router.use('/', function(req, res, next){
  	//A. CHECK THE USER STORED IN SESSION FOR A CUSTOM VARIABLE
	if(!req.user) res.redirect('/');
	else next()
})

router.get('/', function(req, res) {
	//A. When you're signed in, passport will auto include the user object to the request object
	var profileData  = req.user
	res.render('users', {
		user: { 
			name:  profileData.displayName,
			image: profileData.image
		} 
	});
});

module.exports = router;

