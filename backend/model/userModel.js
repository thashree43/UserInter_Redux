import mongoose  from "mongoose";

const UserModel = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    image:{
        type:String
    },
    is_Admin:{
        type:Boolean,
        default:false
    }
    
},{timestamps:true},)

const userschema = mongoose.model('user',UserModel)
export default userschema