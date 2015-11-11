var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//var http = require('http');
//var httpProxy = require('http-proxy');
var routes = require('./routes/index');
var users  = require('./routes/users');

//AWS S3
/*
var aws = require('aws-sdk');
aws.config.loadFromPath('./config.json');
var s3 = new aws.S3();
*/

//Connect to MongoDB
//var mongo = require('mongodb');
var mongoose  = require('mongoose');
mongoose.connect('mongodb://localhost:27017/db_no1');
/*
var Cat = mongoose.model('cat', { name: String});
var kitty = new Cat({name: 'wertyu'});
kitty.save(function(err){
    if(err)
        console.log('meow');
});
*/
var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');

//app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Access css,js
app.use(express.static('public'));

app.get('/', routes);
app.get('/users', users);

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

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



// AWS 白名單也要開放IP,port
app.listen(8080);
module.exports = app;