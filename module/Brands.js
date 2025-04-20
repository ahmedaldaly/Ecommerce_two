const mongoose = require('mongoose');
const brandsSchema = new mongoose.Schema({
    name: {
        required:true,
        type:String,
        trim:true,
        unique:true,
        
    },
    image:{
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
    }
},{timestamps:true})
const Brand = mongoose.model('Brand',brandsSchema);
module.exports = Brand ;