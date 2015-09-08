/* ** ** ** ** ** ** **
Express Server
* ** ** ** ** ** ** **/
var express    = require('express')
, path         = require('path')
, favicon      = require('serve-favicon')
, logger       = require('morgan')
, cookieParser = require('cookie-parser')
, bodyParser   = require('body-parser')
, passport     = require('passport')
, session      = require('express-session')
, compression  = require('compression')
, flash        = require('connect-flash')

module.exports = function( app, config ){
    app.locals.pretty = true;
    app.set('port', config.port);
    app.set('ipaddress', config.ip);

    // view engine setup
    app.set('views', path.join( config.rootPath, 'views'));
    app.set('view engine', 'jade');
	
    app.use(logger('dev'));
	app.use(compression()); 
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded( { extended: true }));
    app.use(express.static(path.join( config.rootPath, 'public')));    
	app.use(flash())
	
	//Passport ///////////////////////////////////////
	app.use(session({ 
		secret: 'mySecret',
	    saveUninitialized: true, // (default: true)
	    resave: true // (default: true)
	}))	
}
