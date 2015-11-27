var mongoose  = require('mongoose');
var Schema = mongoose.Schema;  //骨架


var clientSchema = new Schema({
	client_name: String,
	client_email: String,
	client_message: String,
	date: {type: Date, default: Date.now},
});
var clientCollection = mongoose.model('client', clientSchema);

module.exports = clientCollection;