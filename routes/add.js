var express = require('express');
var router  = express.Router();

router.get('/adduser', function(req, res) {
	res.render('adduser', {title: 'ADDD12D!!!!'});
	console.log('ggggget');
});

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


//TESTing
Usercollection.find(function(err){
    if(err) return console.err(err);
	console.dir('確實可以連接到userCollection');
});  
////

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