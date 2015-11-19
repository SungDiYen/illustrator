var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs'); //file system

//var http = require('http');
//var httpProxy = require('http-proxy');
var routes = require('./routes/index');
var users  = require('./routes/users');
var add    = require('./routes/add');
var upload = require('./routes/upload');
var del = require('./routes/del');
//AWS S3
/*
var aws = require('aws-sdk');
aws.config.loadFromPath('./config.json');
var s3 = new aws.S3();
*/

var multer  = require('multer');



//插入db
require( './db' );
var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');

//app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


// Access css,js 讓css, js也可以被抓到
app.use(express.static('public'));


app.use('/', routes);
app.post('/', routes);

app.get('/users', users);

app.get('/upload', upload.displayView);
app.post('/upload', upload.uploadProject);

/**/
app.use(multer({dest:'./public/images',}).single('photo'));
/**/

app.get('/adduser', add);
app.post('/adduser',add);// 必須加 post 才會作用

app.post('/del', del);
// Post 流程 Step-1
// 來自'/adduser'的 post 請求，使用 router/add.js 的 router.post




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