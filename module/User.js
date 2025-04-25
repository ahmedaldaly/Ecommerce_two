const mongoose = require('mongoose')
const UserSchema =new mongoose.Schema({
    name:{
        type:String,
        required:true, 
        trim:true,
        minlength:5
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true,
    },
    token:{
        type:String,
        trim:true,
      
    },
    address:{
        type:String,
        trim:true,
      default:'no address'
    },
    phone:{
        type:Number,
        trim:true,
      
    },
    password:{
        type:String,
        required:true,
        trim:true,
        minlength:8
    },
    image:{
        url:{
            type:String,
            trim:true,
            default:'https://img.icons8.com/ios/50/user.png'
        },
        id:{
            type:String,
            trim:true,
              default:'id'
        }
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    isTrader:{
        type:Boolean,
        default:false
    }
},{timestamps:true})

 const User = mongoose.model('User',UserSchema)

 module.exports = User;