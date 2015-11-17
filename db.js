// Schema, Model

//Connect to MongoDB
//var mongo = require('mongodb');
var mongoose  = require('mongoose');
var Schema = mongoose.Schema;  
mongoose.connect('mongodb://localhost:27017/db_no1');

var db = mongoose.connection;
//一旦建立连接，则会触发
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log("Database Connected. 資料庫連結成功");
});

var projectSchema = new Schema({
	cover_img : String, //url path
	p_title: String,
	p_cata: String,
	p_intro: String,
	data: {type: Date, default: Date.now},
	hidden: Boolean,
})

var project = mongoose.model('project', projectSchema);








//////////////////// Test ////////////////////

//建立 schema 確認各欄位名稱與資料格式
var movieSchema = new Schema({
    title: {type: String},
    rating: String,
    releaseYear: Number,
    hasCreditCookie: Boolean
});   


//使用movieSchema作为结构编译一个'Movie'模型
//宣告變數，同時在資料庫建立「Movie」的collection (collection 名稱結尾為字串的話，會自動加「s」)
//真正跟資料庫作用的事 Model
//var Movie = mongoose.model('Movie', movieSchema);

/*
// default data
var thor = new Movie({
    title: 'third',
    rating: 'PG-17',
    releaseYear: '2013',   //注意我们在这里使用一个字符串而不是一个数字 -- Mongoose会为我们自动转换     
    hasCreditCookie: true
});    
*/


/*
//存值 save
thor.save(function(err,thor){
    if(err) return console.log(err);
    console.dir(thor);
});
*/

/*
//有條件的取值 find
//找到變數(Movie)，以及對應的 Collection ('Movie')
Movie.find({title: 'Thor'},function(err,thor){
    if(err) {
    	return console.err(err);
    }
    else {
    	console.dir('可以查詢得到資料');
    }
});
*/