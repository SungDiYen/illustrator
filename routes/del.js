var express = require('express');
var router  = express.Router();

var mongoose  = require('mongoose'),
	Schema = mongoose.Schema;  
/*
var projectSchema = new Schema({
	cover_img :      String, //url path
	project_title:   String,
	project_catalog: String,
	project_content: String,
	project_date:    {type: Date, default: Date.now},
	project_status:  Boolean,
})
var projectCollection = mongoose.model('project', projectSchema);
*/





router.post('/del', function(req, res){
	projectData.find({id: ta}, function(err, projectData){
		if(err) {
			throw err;
			console.log('xx');
		}else{
			projectData.remove(function(err){
				if(err) throw err;
				console.log('delete');
				res.redirect('/');
			})
		}
	})
})
module.exports = router;