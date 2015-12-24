var mongoose  = require('mongoose');
var Schema = mongoose.Schema;  //骨架

/////// model 與 
var projectSchema = new Schema({	//模型
    project_title:   String,
    project_catalog: String,
    project_content: String,
    project_date:    {type: Date, default: Date.now},
    project_status:  Boolean,
    cover :          {type: String, default: 'default',unique: true}, //url path
    gallery:  		 [String],//Array?
    sequence:        {type: Number, default: 0, unique: true},

    //default 的出現，會在 router 沒有呼叫時傳入
})
var projectCollection = mongoose.model('project', projectSchema);

//// 必須轉出 才可以給別人用
module.exports = projectCollection;
////