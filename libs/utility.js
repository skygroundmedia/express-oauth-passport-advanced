/* ** ** ** ** ** ** ** * ** ** ** ** ** ** ** * 
* New User Utilities
* ** ** ** ** ** ** ** * ** ** ** ** ** ** ** **/
var Hashids    = require("hashids")
, utility = {}

//Used to generate a normal looking customer ID
utility.getRandomFixedInteger = function(length){
    return Math.floor(Math.pow(10, length-1) + Math.random() * (Math.pow(10, length) - Math.pow(10, length-1) - 1));
}

//Create a semi-complicated looking cash for public_api's
utility.getHash = function(salt){
	  var length = 10
    var hash = new Hashids(salt, length, "0123456789abcdef");
    return hash
}

//Encode hex for MongoDB:https://www.npmjs.com/package/hashids
utility.getPublicAPIKey = function(salt, number){
    var hash = this.getHash(salt)
    //Encode this specifically for Mongo
    return hash.encodeHex( number.toString() );
}

// route middleware to make sure a user is logged in
utility.isLoggedIn = function (req, res, next) {
    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated()) return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}


module.exports = utility;
