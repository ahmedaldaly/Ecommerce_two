const mongoose =require('mongoose');
const CategorySchema = new mongoose.Schema({
    name :{
        type:String,
        required:true,
        unique:true,
        trim:true,
        minlength:5
    },
    image:{
        url:{
            type:String,
            trim:true,
            required:true
        },
        id:{
            type:String,
            trim:true,
            required:true
        }
    },
    subCategory:[{
        name:{
            type:String,
        },
        image:{
            url:{
                type:String,
                trim:true,
               
            },
            id:{
                type:String,
                trim:true,
              
            }
        }
    },{timestamps:true}]
})
const Category = mongoose.model('Category',CategorySchema);
module.exports = Category;