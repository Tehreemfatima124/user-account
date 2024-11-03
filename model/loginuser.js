const mongoose = require("mongoose");
const loginUsersSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required : true
    }
})
const signupuserSchema = new mongoose.Schema({
    Name:{
        type:String,
        required: true
    },
    LastName:{
        type: String,
        required: true
    },    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required : true
    } 
})
const Login = mongoose.model("loginusers",loginUsersSchema);
const Signup = mongoose.model("signupuser",signupuserSchema);
module.exports = {Login , Signup};