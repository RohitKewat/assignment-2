
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId ;

const postSchema = new Schema({
    title : {type : String , required :true},
    body : {type : String, required :true},
    image :{type: String ,required : true},
    user : {type : ObjectId,ref:"userSchema"}
},{timestamps:true});

const postModel = mongoose.model('posts',postSchema);
module.exports = postModel ;