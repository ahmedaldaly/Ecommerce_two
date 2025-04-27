const mongoose = require ('mongoose');
const productSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true,
        minlength:5,
    },
    description:{
        type:String,
        required:true,
        trim:true,
        minlength:5,
        maxlength: 1000,
    },
    price:{
        type:Number,
        required:true,
        trim:true,
    },
    image:[{
        url:{
            type:String,
            required:true,
            trim:true,
        },
        id:{
            type:String,
            required:true,
            trim:true, 
        }
    }],
    category:{
        type:String,
        required:true,
        trim:true,
    },
    brand:{
        type:String,
        required:true,
        trim:true,  
    },
    quantity:{
        type:Number,
        trim:true,
    },
    color:[{
        type:String,
        required:true,
        trim:true,
    }],
    size:[{
        type:String,
        trim:true
    }],
    rating:[{
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User',
        },
        rating:{
            type:Number,
            trim:true
        },
        comment:{
            type:String,
            trim:true
        }
    }],
    discount: {
        type: Number,
        default: 0
      },
},{timestamps:true})
const Product = mongoose.model('Product',productSchema);
module.exports = Product;