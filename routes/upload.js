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
	})
}

/* POST data */
//ARRAY
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