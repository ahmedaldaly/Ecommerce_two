const mongoose = require('mongoose');
const rateingSchema = new mongoose.Schema({
    user:{
        required:true,
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    },
    product:{
        required:true,
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product',
    },
    rateing:{
        required:true,
        type:Number,
        trim:true,
        min:1,
        max:5
    }
})
const rateing = mongoose.model('rateing',rateingSchema);
module.exports = rateing;