var express = require('express');
var router  = express.Router();



// Post 流程 Step-2
// 建立 Schema & Model，定義傳入資料的「欄位與格式」
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    username: String,
    email:    String
});

//var Movie = mongoose.model('Movie', movieSchema);
//不得重複寫入，已經在db.js出現過

var Usercollection = mongoose.model('Usercollection', userSchema); 

router.get('/adduser', function(req, res) {
	Usercollection.find(function(err, docs){
	    if(err) {
	    	return console.err(err);
	    }else{
	    	console.dir('確實可以連接到userCollection');
			var html = docs; // json object

			
				var json_str = JSON.stringify(docs); // string
				var json_obg = JSON.parse(json_str); // object

				var empty_arr = [];

				var level_one = Object.keys(json_obg); 
				// [ '0', '1', '2', '3', '4', '5', '6', '7', '8', '9' ]
				// 得知共有多少筆資料、Array
				level_one.forEach(function(objectid){
					var level_two = Object.keys( json_obg[objectid] );

					level_two.forEach(function(col_name){
						var fin_data = json_obg[objectid][col_name];

						console.log(objectid+':'+col_name+'='+fin_data);
						empty_arr.push(fin_data);
					})
				})
				//return level_one
			


			res.render('adduser', {
				// 標頭盡量不要重複取名
				title: 'ADDD12D!!!!', 
				data: html,
				data_col: html[0],
				data_username: html[0].username,
				data_email: html[0].email,
				data_id: html[0].id,
				data_three: docs,
				func: json_str,
				repo: [
					{name: '1111'},
					{name: '2222'},
					{name: '33'},
				],
				'name_w': 'abbey',
				'wording': function() {
					return function(text){
						return '<div>'+ text +'</div>'
					}
				},
				repo: [], //必須為「空集合」
				ignoreeee: 'nothinig',
				wrap_box: [ //無法作出 for loop的效果， 只是單純分出區塊
					{0: [
						{main: '標題'},
						{cata: '品牌識別'},
						{btn_v: 'more'},
						{btn_h: '更了解'},
						{img: 'src='+'https://dl.dropboxusercontent.com/u/38967251/flim_clip.png'},
					]},
					{1: [
						{main: '標題2'},
						{cata: '品牌識別2'},
						{btn_v: 'more2'},
						{btn_h: '更了解2'},
						{img: 'src='+'https://dl.dropboxusercontent.com/u/38967251/flim_clip.png'},
					]},
				],
				wrap_box_2: [
					{main: '標題',
					 cata: '分類',
					 btn_v: 'more',
					 btn_h: '更了解',
					 img: 'src='+'https://dl.dropboxusercontent.com/u/38967251/flim_clip.png'
					},
					{main: '標題2',
					 cata: '分類2',
					 btn_v: 'more2',
					 btn_h: '更了解2',
					 img: 'src='+'https://dl.dropboxusercontent.com/u/38967251/flim_clip.png'
					},
				]
			});
			
	    }
	});
});





/*
//TESTing
Usercollection.find(function(err, docs){
    if(err) {
    	return console.err(err);
    }else{
    	console.dir('確實可以連接到userCollection');
		var html = "<p> 查询到的数据为：" + JSON.stringify(docs);
			send(html);
    }
});  
////
*/

// Post 流程 Step-3
// 接收到來自「瀏覽器的請求」
//
router.post('/adduser', function(req, res) {
	// 抓取表單資料 ＆繼承 Model
	var test_user = new Usercollection({
		username: req.body.username_test,
		email: req.body.email_test
	})
	// 讓 model 的資料欄位，儲存在資料庫
	test_user.save(function(err, test_user){
		if(err) res.send(err);
		console.log(test_user);
	})
})

module.exports = router;