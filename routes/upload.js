var express = require('express');
var router  = express.Router();


// 將 Schema & model 與 Router 拆開
var projectCollection = require('../models/model_project.js');

exports.uploadView = function(req, res) {
	projectCollection.find(function(err, db_data){
		if(err) {
			return console.log(err);
		}else{
			res.render('upload', { 
				title: 'upload project',
				p_con: db_data,
			});
		}
	}).sort("sequence")
}
// sort 依照 sequence 排序(添加"-" 為降序)


/* POST data */
//ARRAY
/*
exports.projects = function(req, res, next) {
	var docs = req.body;
	var projectData = new projectCollection({
		project_title   : docs.title,
		project_catalog : docs.catalog,
		project_content : docs.content,
		project_status  : docs.status,
		cover_img 		: req.files[0].filename  //multer 轉譯後的名稱
		//cover_img       : req.files[0].originalname,	//原本的檔案名稱
	})
	projectData.save(function(err, projectData){
		if(err) {
			res.send(err);
		}else{
			console.log(projectData);
			//console.log(req.files);
			res.redirect('/upload');
		}
	});
}*/


exports.projects = function(req, res, next) {
	var docs = req.body;	
	var projectData = new projectCollection({
		project_title   : docs.title,
		project_catalog : docs.catalog,
		project_content : docs.content,
		project_status  : docs.status,
		sequence		: docs.sequence,
		
		//gallery: ['1','2'],
		/*
		//cover_img       : req.files[0].originalname,	//原本的檔案名稱
		gallery			: [req.files['gallery'][0].filename,
							req.files['gallery'][1].filename,
							],*/
	})
	
	check_cover();
	check_gallery();

	projectData.save(function(err, projectData){
		if(err) {
			res.send(err);
		}else{
			console.log(projectData);
			//console.log(req.files);
			res.redirect('/upload');
		}
	});

	//extra
	function check_cover(){
		if(req.files['cover'] == undefined){
			projectData.cover = 'none'
		}else{
			projectData.cover = req.files['cover'][0].filename; //multer 轉譯後的名稱 
									//req.files[0].originalname,	//原本的檔案名稱
		}
	}
	function check_gallery(){
		if(req.files['gallery'] == undefined){
			projectData.gallery = []
		}else {	// i 從 0 開始，會是好習慣！
			for(i = 0; i <= req.files['gallery'].length -1; i++){
				projectData.gallery[i] = [req.files['gallery'][i].filename]
			}
		}
	}
}


//remove or findByIdAndRemove
exports.pro_delete = function(req, res) {
	var del_item = req.params.id;
	//console.log(del_item);
	projectCollection.findByIdAndRemove(del_item, function(err){
		if(err) {
			console.log(err);
			return
		}else{
			//console.log('deletee');
			res.redirect('/upload');
		}
	})
}

//update = find + 覆蓋
exports.pro_update = function(req, res, next) {
	var update_item = req.params.id;
	//console.log(update_item);
	//console.log('req.body.new_w');
	//res.redirect('/upload');
	
	projectCollection.findById(update_item, function(err, newData){
		console.log(newData); //取得 完整欄位與值 object形式
		
		//newData = new projectCollection; //存在的話 會建立新的 docement
		newData.project_content = req.body.newInput,
		newData.sequence 		= req.body.newSequence,

		newData.save(function(err, newData){
			if(err){
				console.log(err);
			}else{
				//res.redirect('/upload');
				//Don't work
			}
		})
	})
}


//SINGLE
/*exports.images = function(req, res, next){
	res.redirect('/upload');
	console.log(req.file); //Array type
}*/




/* GET home page. */
//router.get('/upload', function(req, res) {
//	projectCollection.find(function(err, db_data){
//		if(err) {
//			return console.log(err);
//		}else{
//			res.render('upload', { 
//				title: 'upload project',
//				p_con: db_data,
//			});
//		}
//	})
//});


/* 舊寫法
router.get('/upload', function(req, res) {
	projectCollection.find(function(err, db_data){
		if(err) {
			return console.log(err);
		}else{
			res.render('upload', { 
				title: 'upload project',
				p_con: db_data,
			});
		}
	})
});
//module.exports = router;
*/