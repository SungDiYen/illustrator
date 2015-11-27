var express = require('express');
var router  = express.Router();

var clientDB = require('../models/messages.js')

// GET home page. 
exports.show_lists = function(req, res){
	clientDB.find(function(err, client_data){
		if(err){
			return console.log(err);
		}else{
			res.render('messages', {
				title: 'SungDiYen 宋狄諺',
				client: client_data
			})
		}
	})
}
exports.list_delete = function(req, res){
	var del_id = req.params.id;

	clientDB.findByIdAndRemove(del_id, function(err){
		if(err) console.log(err);
		res.redirect('/messages');
	})
}
//module.exports = router;