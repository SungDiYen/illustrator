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
//var users  = require('./routes/users');
//var add    = require('./routes/add');
var upload = require('./routes/upload');
var client_message = require('./routes/message');

//AWS S3
/*
var aws = require('aws-sdk');
aws.config.loadFromPath('./config.json');
var s3 = new aws.S3();
*/

var multer  = require('multer'); //multi-part/form
var upload_img = multer({
                    dest:'./public/images/projects',
                    /*
                    rename: function(fieldname, filename){
                        return fieldname+'TEST';
                    },
                    onFileUploadStart: function (file) {
                        console.log(file.originalname + ' is starting ...');
                    },
                    onFileUploadComplete: function (file) {
                        console.log(file.fieldname + ' uploaded to  ' + file.path)
                    },
                    inMemory: true //This is important. It's what populates the buffer.
                    */
                });
var multi_field = multer({ dest: './public/images/projects' }).fields([
                    { name: 'cover', maxCount: 1 }, //符合 input,name欄位名稱
                    { name: 'gallery', maxCount: 8 }
                    ]);




//插入db &連接
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
app.get('/upload', upload.uploadView);
//app.post('/upload', upload_img.single('test_photo'), upload.images);
//app.post('/upload', upload_img.array('test_photo', 12), upload.projects);
app.post('/upload', multi_field, upload.projects);
//dest: 檔案儲存路徑
    //array('photos', 12)上傳檔案 & formdata 單一檔案,最多12個 必须与表单上传的name属性保持一致。
    //single: input, name欄位
    //multer會自動幫你重新命名
app.get('/upload/del/:id', upload.pro_delete); //刪除 byId
app.post('/upload/edit/:id', upload.pro_update);//更新 byId
app.get('/upload/edit/:id', function(req, res){ //重新導向
    res.redirect('/upload');
})

app.get('/messages', client_message.show_lists);
app.get('/messages/del/:id', client_message.list_delete);
//app.get('/users', users);
//app.get('/adduser', add);
//app.post('/adduser',add);// 必須加 post 才會作用

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