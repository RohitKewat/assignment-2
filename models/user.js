const mongoose = require('mongoose') ;


const Schema = mongoose.Schema ;
const ObjectId = Schema.ObjectId;

const userSchema = new Schema({

    name : {type : String , required : true },
    email : {type : String, required : true , unique : true },
    password : {type : String  ,required : true}
})

const userModel = mongoose.model('user',userSchema) ;

module.exports = userModel 