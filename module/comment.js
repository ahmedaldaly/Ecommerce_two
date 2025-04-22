const mongoose = require('mongoose');
const commentSchema = new mongoose.Schema({
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
    comment:{
        required:true,
        type:String,
        trim:true,
        minlength:5,
        maxlength:300,
    }
})
const comment = mongoose.model('comment',commentSchema);
module.exports = comment;