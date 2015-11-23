var mongoose  = require('mongoose');
var Schema = mongoose.Schema;  

/////// model 與 
var projectSchema = new Schema({
    cover_img :      String, //url path
    project_title:   String,
    project_catalog: String,
    project_content: String,
    project_date:    {type: Date, default: Date.now},
    project_status:  Boolean,
    content_images:  '',//Array?
})
var projectCollection = mongoose.model('project', projectSchema);

//// 必須轉出 才可以給別人用
module.exports = projectCollection;
////