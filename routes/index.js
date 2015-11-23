var express = require('express');
var router  = express.Router();

var projectDB = require('../models/model_project.js')

// GET home page. 
router.get('/', function(req, res) {
	projectDB.find(function(err, project_data){
		if(err){
			return console.log(err);
		}else{
			res.render('index', {
				title: 'SungDiYen 宋狄諺',
				project: project_data
			})
		}
	})
});

/*Post from page */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var clientSchema = new Schema({
	client_name: String,
	client_email: String,
	client_message: String
});

var clientCollection = mongoose.model('client', clientSchema);

router.post('/', function(req, res) {
	var clientData = new clientCollection({
		client_name: req.body.name,
		client_email: req.body.email,
		client_message: req.body.msg
	})

	clientData.save(function(err, clientData){
		if(err) res.send(err);
		console.log(clientData)
	})
});


module.exports = router;