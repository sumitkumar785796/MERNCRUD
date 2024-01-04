const mongoose = require('mongoose')
//create schema
const userSchema = new mongoose.Schema({
    fname:{
        type:String,
        required:true,
    },
    lname:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    mobile:{
        type:String,
        required:true
    }
})
//define model or the collection name
const User = new mongoose.model('User',userSchema)
module.exports = User