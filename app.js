var express  = require('express')
, async      = require('async')
, passport   = require('passport')

, routes     = require('./routes/index')
, users      = require('./routes/users')
, auth       = require('./routes/auth')
, app        = express()

/* ** ** ** ** ** ** **
Config
* ** ** ** ** ** ** **/
var env      = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var config   = require('./config/config.js.dist')[env]

console.log("~~~~YOU ARE IN: [", env, "] ENVIRONMENT~~~~")

/* ** ** ** ** ** ** **
* ExpressJS
* ** ** ** ** ** ** **/
require('./libs/express')(app, config)

/* ** ** ** ** ** ** **
* Passport
* ** ** ** ** ** ** **/
require('./libs/passport')(app, config)

/* ** ** ** ** ** ** **
* Performance Boost: Concurrent Routing
* ** ** ** ** ** ** **/

/*
function parallel(middlewares) {
  return function (req, res, next) {
	//B. Execute in Parallel
    async.each(middlewares, function (mw, cb) {
      mw(req, res, cb);
		console.log("MW::2", new Date().getTime())
    }, next);
  };
}

app.use(parallel([
  app.use('/auth', auth),
  app.use('/users', users),
  app.use('/', routes)
]));
*/

app.use('/auth', auth),
app.use('/users', users),
app.use('/', routes)


/* ** ** ** ** ** ** **
* Error handling
* ** ** ** ** ** ** **/
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;

/* ** ** ** ** ** ** **
* App Server Listening
* ** ** ** ** ** ** **/
app.listen(app.get('port'), app.get('ipaddress'), function() {
    console.log("Node app is running at localhost:" + app.get('port'))
});