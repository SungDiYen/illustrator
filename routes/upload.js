var express = require('express');
var router  = express.Router();

var mongoose  = require('mongoose'),
	Schema = mongoose.Schema;  

var projectSchema = new Schema({
    cover_img :      String, //url path
    project_title:   String,
    project_catalog: String,
    project_content: String,
    project_date:    {type: Date, default: Date.now},
    project_status:  Boolean,
})
var projectCollection = mongoose.model('project', projectSchema);



exports.displayView = function(req, res) {
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
exports.uploadProject = function(req, res, next) {
	//var aa = req.files.file.name
	//console.log(aa);
	var docs = req.body;
	var projectData = new projectCollection({
		project_title   : docs.title,
		project_catalog : docs.cata,
		project_content : docs.content,
		project_status  : docs.status,
		cover_img       : docs.image
	})
	
	projectData.save(function(err, projectData){
		if(err) res.send(err);
		console.log(projectData);
	});

}


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